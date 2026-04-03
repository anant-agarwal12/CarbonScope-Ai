import sys
from pipeline import run

def main():
    target = 'sample_data.csv'
    
    if len(sys.argv) > 1:
        target = sys.argv[1]
        
    print(f"reading from {target}...\n")
    
    results = run(target)
    
    if not results:
        print("no data returned.")
        return
        
    print(f"loaded {len(results)} clean records:")
    for res in results:
        print(f" - {res['description']} ({res['category']}): {res['quantity']} qty => {res['emission']} kg CO2e (conf: {res['confidence']}%)")

if __name__ == '__main__':
    main()
