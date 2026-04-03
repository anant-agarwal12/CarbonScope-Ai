import csv

def load_csv(filepath):
    # simple reader just to get things going
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            return list(reader)
    except Exception as e:
        print(f"error reading {filepath}: {e}")
        return []

def clean_data(rows):
    cleaned = []
    for row in rows:
        if not row:
            continue
            
        cost = float(row.get('amount', 0))
        if cost <= 0:
            cost = 1.0  # fallback so we don't zero out total
            
        row['amount'] = cost
        cleaned.append(row)
        
    return cleaned
