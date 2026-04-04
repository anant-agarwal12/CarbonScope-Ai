import asyncio
from database import factors_collection

factors = [
    {
        "category": "Metals",
        "factor": 2.50, # kg CO2e per unit
        "keywords": ["steel", "iron", "aluminium", "aluminum", "copper", "metal", "zinc", "alloy"],
        "source": "EPA Spend-Based 2024",
        "unit": "kg"
    },
    {
        "category": "Plastics",
        "factor": 3.10, 
        "keywords": ["plastic", "pvc", "polyethylene", "nylon", "rubber", "foam", "resin"],
        "source": "Defra 2023",
        "unit": "kg"
    },
    {
        "category": "Transport",
        "factor": 1.80,
        "keywords": ["shipping", "freight", "courier", "uber", "flight", "truck", "delivery", "logistics"],
        "source": "EPA Distance-based",
        "unit": "shipments"
    },
    {
        "category": "Electronics",
        "factor": 50.0,
        "keywords": ["laptop", "macbook", "phone", "server", "monitor", "printer", "cable", "charger", "switch"],
        "source": "Ecoinvent 3.9",
        "unit": "units"
    },
    {
        "category": "Office Supplies",
        "factor": 0.50,
        "keywords": ["paper", "pen", "notebook", "toner", "stapler", "envelope", "folder", "carton"],
        "source": "EPA Spend-Based 2024",
        "unit": "units"
    },
    {
        "category": "Energy",
        "factor": 2.68,
        "keywords": ["diesel", "propane", "natural gas", "gas", "electricity", "fuel"],
        "source": "EPA Fuel 2024",
        "unit": "litres/m3"
    },
    {
        "category": "Food & Agriculture",
        "factor": 3.5,
        "keywords": ["rice", "palm oil", "fertiliser", "crop", "grain", "wheat", "food"],
        "source": "Defra 2023",
        "unit": "kg"
    },
    {
        "category": "Textiles",
        "factor": 15.0,
        "keywords": ["cotton", "polyester", "fabric", "yarn", "denim", "uniform", "textile"],
        "source": "Higg MSI",
        "unit": "kg"
    },
    {
        "category": "Chemicals",
        "factor": 4.2,
        "keywords": ["epoxy", "paint", "solvent", "cleaning", "adhesive", "chemical", "primer"],
        "source": "Ecoinvent 3.9",
        "unit": "kg/litres"
    },
    {
        "category": "Other",
        "factor": 1.0,
        "keywords": ["cloud", "compute", "aws", "service", "fee", "miscellaneous", "software"],
        "source": "Industry Average",
        "unit": "fallback"
    }
]

async def seed():
    # Clear existing factors to reseed
    await factors_collection.delete_many({})
    
    # Insert new
    result = await factors_collection.insert_many(factors)
    print(f"Successfully seeded {len(result.inserted_ids)} emission factor categories into MongoDB!")

if __name__ == "__main__":
    from database import MONGO_URI
    print(f"Connecting to: {MONGO_URI}")
    print("Seeding database...")
    asyncio.run(seed())
