import os
import typing
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

from database import factors_collection

# Define the expected format of extracted items
class EmissionItem(BaseModel):
    description: str = Field(description="Name or description of the purchased item, service, or emission source")
    quantity: float = Field(description="Quantity of the item")
    category: str = Field(description="The matching emission category from the provided valid categories list")
    confidence: int = Field(description="Estimated confidence of this categorization from 0 to 100")

async def extract_from_document(filepath: str, mime_type: str) -> list[dict]:
    """
    Uses Google Gemini Free Tier API to parse unstructured documents (PDFs, images)
    and extract emission items matching the database categories.
    """
    # 1. Check for API Key
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "..." or api_key == "":
        raise ValueError("GEMINI_API_KEY is not set. Please get a free API key from Google AI Studio and add it to your .env file.")

    # 2. Fetch categories from database to use as choices
    cursor = factors_collection.find({})
    factors_data = await cursor.to_list(length=100)
    valid_categories = [doc.get("category", "Other") for doc in factors_data]
    
    if not valid_categories:
        valid_categories = ["Transport", "Energy", "Office Supplies", "Textiles", "Electronics", "Plastics", "Metals", "Other"]

    # 3. Initialize Gemini Client
    client = genai.Client(api_key=api_key)

    # 4. Upload file to Gemini API (or pass inline)
    # Using the standard File API is safer for potentially large PDFs
    uploaded_file = client.files.upload(file=filepath, config={'mime_type': mime_type})

    try:
        # 5. Extract structured data
        prompt = f"""
        You are an expert at extracting inventory and procurement data.
        Review the attached document and extract a list of all purchased items, materials, or services.
        
        For each item:
        - Provide a short "description"
        - Extract the "quantity" as a number (float). If not specified, default to 1.
        - Assign the most appropriate "category" STRICTLY from this list: {valid_categories}. If unclear, use "Other".
        - Provide a "confidence" score (0-100) reflecting how sure you are about the category match.
        """
        
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[uploaded_file, prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=list[EmissionItem],
                temperature=0.1
            )
        )
        
        # 6. Parse result
        # The SDK automatically gives us the parsed Pydantic objects if we use response.parsed
        # but because we passed list[EmissionItem] to response_schema, we can read response.parsed
        
        items = response.parsed
        
        result_dicts = []
        if items:
            for item in items:
                result_dicts.append({
                    "description": item.description,
                    "quantity": item.quantity,
                    "category": item.category,
                    "confidence": item.confidence
                })
                
        return result_dicts
        
    finally:
        # Clean up file from Google servers to save storage quota
        try:
            client.files.delete(name=uploaded_file.name)
        except Exception as e:
            print(f"Failed to delete remote file {uploaded_file.name}: {e}")
