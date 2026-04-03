import csv
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

        cat, conf = classify(desc)
        co2 = get_emission(qty, cat)

        results.append({
            'description': desc,
            'category': cat,
            'quantity': qty,
            'emission': round(co2, 2),
            'confidence': conf
        })

    return results
