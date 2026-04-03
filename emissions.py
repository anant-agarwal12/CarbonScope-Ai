factors = {
    'metals': 2.5,        # kg CO2e per unit
    'plastics': 3.1,      # kg CO2e per unit
    'transport': 1.8,     # kg CO2e per delivery
    'electronics': 50.0,  # kg CO2e per device
    'office supplies': 0.5, # kg CO2e per bulk pack
    'other': 1.0          # general fallback stuff
}

def get_emission(qty, cat):
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

    factor = factors.get(cat, 1.0)
    return q * factor
