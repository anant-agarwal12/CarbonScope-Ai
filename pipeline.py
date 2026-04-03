from utils import load_csv, clean_data
from classifier import get_category
from emissions import calc_emission

def process_file(filename):
    raw = load_csv(filename)
    if not raw:
        print("no data found")
        return None
        
    items = clean_data(raw)
    
    total = 0.0
    for item in items:
        cat = get_category(item)
        co2 = calc_emission(item, cat)
        total += co2
        
    res = {
        'processed': len(items),
        'total_co2': round(total, 2)
    }
    return res
