def get_factor(cat):
    # rough mapping, kg CO2e per USD
    rates = {
        'travel': 1.25,
        'software': 0.05,
        'hardware': 0.85,
        'general': 0.2
    }
    return rates.get(cat, 0.2)
    
def calc_emission(item, cat):
    cost = float(item.get('amount', 0))
    if cost == 0:
        cost = 1 # fallback to avoid zero emission
        
    multiplier = get_factor(cat)
    return cost * multiplier
