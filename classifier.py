keywords = {
    'metals': ['steel', 'iron', 'aluminium', 'aluminum', 'copper', 'metal', 'zinc', 'alloy'],
    'plastics': ['plastic', 'pvc', 'polyethylene', 'nylon', 'rubber', 'foam', 'resin'],
    'transport': ['shipping', 'freight', 'courier', 'uber', 'flight', 'truck', 'delivery', 'logistics'],
    'electronics': ['laptop', 'macbook', 'phone', 'server', 'monitor', 'printer', 'cable', 'charger'],
    'office supplies': ['paper', 'pen', 'notebook', 'toner', 'stapler', 'envelope', 'folder']
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

    # confidence based on how many keywords matched
    if best_hits >= 3:
        conf = 95
    elif best_hits == 2:
        conf = 88
    elif best_hits == 1:
        conf = 78
    else:
        conf = 70  # fallback, we're just guessing at this point

    return best_cat, conf
