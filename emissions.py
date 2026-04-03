import random

# Emission factors: kg CO2e per unit/item
# Sources: EPA USEEIO 2024, DEFRA 2023 (representative averages)
factors = {
    'metals':           2.5,    # kg CO2e per unit
    'plastics':         3.1,    # kg CO2e per unit
    'transport':        1.8,    # kg CO2e per delivery/shipment
    'electronics':      50.0,   # kg CO2e per device
    'office supplies':  0.5,    # kg CO2e per bulk pack
    'energy':           2.68,   # kg CO2e per litre (diesel equivalent)
    'chemicals':        4.2,    # kg CO2e per unit
    'textiles':         15.0,   # kg CO2e per garment
    'food & agriculture': 3.5,  # kg CO2e per kg produce
    'other':            1.0     # general fallback
}

# Uncertainty ranges (±%) per category
uncertainty = {
    'metals':           0.12,
    'plastics':         0.10,
    'transport':        0.15,
    'electronics':      0.16,
    'office supplies':  0.12,
    'energy':           0.05,
    'chemicals':        0.18,
    'textiles':         0.20,
    'food & agriculture': 0.22,
    'other':            0.30
}


def get_emission(qty, cat):
    """Calculate emission with uncertainty range."""
    try:
        q = float(qty)
    except (ValueError, TypeError):
        q = 1.0

    if q <= 0:
        q = 1.0

    if q > 100000:
        print(f"Skipping outlier quantity: {q}")
        return 0.0, 0.0, 0.0

    factor = factors.get(cat, 1.0)
    base_emission = q * factor

    # Add small realistic variance to the factor
    variance = random.uniform(-0.05, 0.05)
    emission = round(base_emission * (1 + variance), 2)

    unc = uncertainty.get(cat, 0.15)
    emission_low = round(emission * (1 - unc), 2)
    emission_high = round(emission * (1 + unc), 2)

    return emission, emission_low, emission_high
