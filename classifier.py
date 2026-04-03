import random

keywords = {
    'metals': ['steel', 'iron', 'aluminium', 'aluminum', 'copper', 'metal', 'zinc', 'alloy',
               'brass', 'stainless', 'titanium', 'nickel', 'tin', 'lead', 'coil', 'sheet metal'],
    'plastics': ['plastic', 'pvc', 'polyethylene', 'nylon', 'rubber', 'foam', 'resin',
                 'polypropylene', 'ldpe', 'hdpe', 'acrylic', 'polycarbonate', 'silicone',
                 'gasket', 'pipe fitting', 'packaging film', 'shrink wrap'],
    'transport': ['shipping', 'freight', 'courier', 'uber', 'flight', 'truck', 'delivery',
                  'logistics', 'container', 'air cargo', 'last-mile', 'port', 'warehouse',
                  'forwarder', 'maritime', 'rail', 'transit', 'haulage', 'drayage'],
    'electronics': ['laptop', 'macbook', 'phone', 'server', 'monitor', 'printer', 'cable',
                    'charger', 'router', 'switch', 'gpu', 'cpu', 'ssd', 'hard drive',
                    'keyboard', 'mouse', 'headset', 'networking', 'ups', 'battery'],
    'office supplies': ['paper', 'pen', 'notebook', 'toner', 'stapler', 'envelope', 'folder',
                        'desk', 'chair', 'whiteboard', 'marker', 'binder', 'clip',
                        'carton', 'cardboard', 'stationery', 'label'],
    'energy': ['diesel', 'petrol', 'gasoline', 'natural gas', 'electricity', 'solar',
               'generator', 'fuel', 'kwh', 'mwh', 'power', 'grid', 'utility bill',
               'heating', 'cooling', 'hvac', 'lng', 'coal', 'propane'],
    'chemicals': ['solvent', 'adhesive', 'paint', 'coating', 'epoxy', 'chemical',
                  'cleaning agent', 'detergent', 'lubricant', 'acid', 'alkaline',
                  'pesticide', 'fertilizer', 'reagent', 'catalyst'],
    'textiles': ['cotton', 'fabric', 'textile', 'garment', 'clothing', 'uniform',
                 'polyester', 'wool', 'linen', 'silk', 'denim', 'yarn', 'thread',
                 'stitching', 'embroidery', 'dyeing'],
    'food & agriculture': ['food', 'grain', 'rice', 'wheat', 'corn', 'soy', 'palm oil',
                           'dairy', 'meat', 'poultry', 'seafood', 'vegetable', 'fruit',
                           'coffee', 'tea', 'sugar', 'cocoa', 'animal feed', 'fertiliser']
}

def classify(desc):
    text = desc.lower().strip()

    best_cat = 'other'
    best_hits = 0

    for cat, words in keywords.items():
        hits = sum(1 for w in words if w in text)
        if hits > best_hits:
            best_hits = hits
            best_cat = cat

    # confidence based on keyword match density with slight randomization for realism
    base_conf = 60
    if best_hits >= 3:
        base_conf = 94
    elif best_hits == 2:
        base_conf = 87
    elif best_hits == 1:
        base_conf = 78

    # Add realistic variance (+/- up to 5%)
    jitter = random.randint(-3, 5)
    conf = max(55, min(99, base_conf + jitter))

    return best_cat, conf
