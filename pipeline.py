import csv

def process_file(filename):
    records = []
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            
            for row in reader:
                desc = row.get('description', '').strip()
                
                # skip if we don't know what the item is
                if not desc:
                    continue
                    
                try:
                    qty = float(row.get('quantity') or 1)
                    price = float(row.get('price') or 0)
                except ValueError:
                    continue  # ignore rows with corrupted numbers
                    
                # fallback to avoid zero emission calcs down the line
                if qty <= 0:
                    qty = 1
                    
                records.append({
                    'description': desc,
                    'quantity': qty,
                    'price': price,
                    'total': qty * price
                })
                
    except Exception as e:
        print(f"pipeline error: {e}")
        
    return records
