from database import factors_collection

async def get_emission(qty, cat):
    # handle missing or bad quantity
    try:
        q = float(qty)
    except (ValueError, TypeError):
        q = 1.0

    if q <= 0:
        q = 1.0
        
    # skip wild outliers
    if q > 100000:
        print(f"Skipping crazy high quantity: {q}")
        return 0.0

    # Fetch factor from MongoDB
    factor_doc = await factors_collection.find_one({"category": cat})
    if factor_doc:
        factor = factor_doc.get("factor", 1.0)
    else:
        factor = 1.0

    return q * factor
