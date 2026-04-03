from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import csv
import io
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

class PipelineResponse(BaseModel):
    status: str
    message: str
    records: list
    metrics: dict

@app.get("/")
def read_root():
    return {"status": "active", "message": "CarbonScope AI API is running"}

@app.post("/api/pipeline", response_model=PipelineResponse)
async def process_file(file: UploadFile = File(...)):
    if not file.filename.endswith(('.csv', '.xlsx')):
        return {
            "status": "error",
            "message": "Only CSV and XLSX files are supported",
            "records": [],
            "metrics": {}
        }
        
    try:
         # Read uploaded file
        contents = await file.read()
        
        # We need to temporarily save it or mock parsing since our pipeline.run takes a filepath
        # For simplicity in this demo, let's write it to a temp file and process
        # A more robust approach for production would be passing file-like objects to pipeline.py
        temp_filepath = f"temp_{file.filename}"
         
        with open(temp_filepath, 'wb') as f:
            f.write(contents)
            
        print(f"Processing uploaded file: {file.filename}")
        
        # Run the existing data pipeline
        results = run_pipeline(temp_filepath)
        
        # Calculate summary metrics
        total_emission = sum(r['emission'] for r in results)
        avg_conf = sum(r['confidence'] for r in results) / len(results) if results else 0
        high_risk = sum(1 for r in results if r['confidence'] < 80)
        
        metrics = {
            "totalEmissions": total_emission,
            "avgConfidence": round(avg_conf),
            "itemsProcessed": len(results),
            "highRiskItems": high_risk
        }
        
        # Clean up temp file (ideally done in a background task)
        import os
        if os.path.exists(temp_filepath):
             os.remove(temp_filepath)
             
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
