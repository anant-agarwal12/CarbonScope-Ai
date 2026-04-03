import csv
from datetime import datetime
from classifier import classify
from emissions import get_emission

def load_csv(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return list(csv.DictReader(f))
    except Exception as e:
        print(f"couldn't read file: {e}")
        return []

def run(filepath):
    rows = load_csv(filepath)
    if not rows:
        return []

    results = []
    for i, row in enumerate(rows):
        desc = row.get('description', '').strip()
        if not desc:
            continue

        try:
            qty = float(row.get('quantity') or 1)
        except ValueError:
            continue

        if qty <= 0:
            qty = 1

        # Optional fields from CSV
        supplier = row.get('supplier', 'Unknown Supplier').strip()
        price = row.get('price', '0')
        source_doc = row.get('source', f'Row-{i+1}')

        cat, conf = classify(desc)
        co2, co2_low, co2_high = get_emission(qty, cat)

        results.append({
            'description': desc,
            'category': cat,
            'supplier': supplier,
            'quantity': qty,
            'unit': row.get('unit', 'units').strip() if row.get('unit') else 'units',
            'unitPrice': float(price) if price else 0,
            'emission': co2,
            'emissionLow': co2_low,
            'emissionHigh': co2_high,
            'confidence': conf,
            'date': row.get('date', datetime.now().strftime('%Y-%m-%d')),
            'source': source_doc
        })

    return results
