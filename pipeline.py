import csv
from classifier import classify
from emissions import get_emission
from ai_extractor import extract_from_document

async def load_csv(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return list(csv.DictReader(f))
    except Exception as e:
        print(f"couldn't read file: {e}")
        return []

async def run(filepath, filename="data.csv", mime_type="text/csv"):
    is_csv = filename.lower().endswith('.csv')
    
    if is_csv:
        rows = await load_csv(filepath)
        if not rows:
            return []

        results = []
        for row in rows:
            desc = row.get('description', '').strip()
            if not desc:
                continue

            try:
                qty = float(row.get('quantity') or 1)
            except ValueError:
                continue

            if qty <= 0:
                qty = 1

            cat, conf = await classify(desc)
            co2 = await get_emission(qty, cat)

            results.append({
                'description': desc,
                'category': cat,
                'quantity': qty,
                'emission': round(co2, 2),
                'confidence': conf
            })

        return results
    else:
        # Route anything non-CSV to generative AI using free Gemini API
        ai_items = await extract_from_document(filepath, mime_type)
        
        results = []
        for item in ai_items:
            # We already have qty and category from Gemini
            qty = item.get('quantity', 1)
            cat = item.get('category', 'Other')
            desc = item.get('description', '')
            conf = item.get('confidence', 90)
            
            # calculate emissions
            co2 = await get_emission(qty, cat)
            
            results.append({
                'description': desc,
                'category': cat,
                'quantity': qty,
                'emission': round(co2, 2),
                'confidence': conf
            })
            
        return results
