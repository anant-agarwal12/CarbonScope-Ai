from database import factors_collection

async def classify(desc):
    text = desc.lower().strip()
    
    best_cat = 'other'
    best_hits = 0

    # Fetch all factors and their keywords from MongoDB
    cursor = factors_collection.find({})
    factors_data = await cursor.to_list(length=100)

    for doc in factors_data:
        cat = doc.get("category", "other")
        words = doc.get("keywords", [])
        
        hits = sum(1 for w in words if w in text)
        if hits > best_hits:
            best_hits = hits
            best_cat = cat

    # confidence based on how many keywords matched
    if best_hits >= 3:
        conf = 95
    elif best_hits == 2:
        conf = 88
    elif best_hits == 1:
        conf = 78
    else:
        conf = 70  # fallback, we're just guessing at this point

    return best_cat, conf
