import os
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import io
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from dotenv import load_dotenv

load_dotenv()

from database import (
    users_collection, records_collection, factors_collection,
    get_password_hash, verify_password, create_access_token, decode_access_token
)
from pipeline import run as run_pipeline

app = FastAPI(title="CarbonScope AI API", description="Scope 3 Emission Intelligence Pipeline")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to frontend deployed URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login", auto_error=False)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    if not token:
        return None
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    email = payload.get("sub")
    if not email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
    user = await users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user

class UserCreate(BaseModel):
    email: str
    password: str
    company_name: str

class UserLogin(BaseModel):
    email: str
    password: str

class PipelineResponse(BaseModel):
    status: str
    message: str
    records: list
    metrics: dict

@app.head("/")
@app.get("/")
def read_root():
    return {"status": "active", "message": "CarbonScope AI API is running"}

@app.head("/health")
@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/auth/signup")
async def signup(user: UserCreate):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    user_dict = {
        "email": user.email,
        "password": hashed_password,
        "company_name": user.company_name,
    }
    result = await users_collection.insert_one(user_dict)
    
    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer", "user": {"email": user.email, "company_name": user.company_name}}

@app.post("/auth/login")
async def login(user: UserLogin):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer", "user": {"email": db_user["email"], "company_name": db_user["company_name"]}}


@app.get("/api/records")
async def get_records(current_user: dict = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
        
    cursor = records_collection.find({"user_id": str(current_user["_id"])})
    records = await cursor.to_list(length=1000)
    
    for r in records:
        r["_id"] = str(r["_id"])
        
    return {"records": records}


@app.post("/api/pipeline", response_model=PipelineResponse)
async def process_file(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    supported_extensions = ('.csv', '.xlsx', '.pdf', '.png', '.jpg', '.jpeg', '.txt')
    if not file.filename.lower().endswith(supported_extensions):
        return {
            "status": "error",
            "message": f"Supported file types: {', '.join(supported_extensions)}",
            "records": [],
            "metrics": {}
        }
        
    try:
        contents = await file.read()
        temp_filepath = f"temp_{file.filename}"
        with open(temp_filepath, 'wb') as f:
            f.write(contents)
            
        print(f"Processing uploaded file: {file.filename}")
        
        # Run pipeline (now async)
        results = await run_pipeline(temp_filepath, filename=file.filename, mime_type=file.content_type)
        
        # Clean up temp file
        if os.path.exists(temp_filepath):
             os.remove(temp_filepath)

        # Calculate metrics
        total_emission = sum(r['emission'] for r in results)
        avg_conf = sum(r['confidence'] for r in results) / len(results) if results else 0
        high_risk = sum(1 for r in results if r['confidence'] < 80)
        
        metrics = {
            "totalEmissions": total_emission,
            "avgConfidence": round(avg_conf),
            "itemsProcessed": len(results),
            "highRiskItems": high_risk
        }
        
        # If user authenticated, associate & save
        # Also inject user_id to results to send
        if current_user:
            user_id = str(current_user["_id"])
            for r in results:
                r["user_id"] = user_id
            if results:
                await records_collection.insert_many(results)

            # fix _id to string for returning
            for r in results:
                if "_id" in r:
                    r["_id"] = str(r["_id"])

        return {
            "status": "success",
            "message": f"Processed {len(results)} items successfully",
            "records": results,
            "metrics": metrics
        }
    except Exception as e:
        print(f"Error processing upload: {e}")
        return {
             "status": "error",
             "message": f"Failed to process file: {str(e)}",
             "records": [],
             "metrics": {}
         }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="127.0.0.1", port=8000, reload=True)
