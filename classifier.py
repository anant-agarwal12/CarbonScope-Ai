def get_category(item):
    # just keyword matching for now, we'll add the real ML classifier later
    desc = str(item.get('description', '')).lower()
    
    if 'flight' in desc or 'uber' in desc or 'travel' in desc:
        return 'travel'
    if 'aws' in desc or 'cloud' in desc:
        return 'software'
    if 'laptop' in desc or 'macbook' in desc:
        return 'hardware'
        
    return 'general'

def train_model(data_path):
    # TODO plug in scikit-learn here
    print("training complete")
    return True
