import sys
from pipeline import process_file

def main():
    target = 'sample_data.csv'
    
    if len(sys.argv) > 1:
        target = sys.argv[1]
        
    print(f"reading from {target}...\n")
    
    results = process_file(target)
    
    if not results:
        print("no data returned.")
        return
        
    print(f"loaded {len(results)} clean records:")
    for res in results:
        print(f" - {res['description']}: {res['quantity']}x ${res['price']} (sum: ${res['total']})")

if __name__ == '__main__':
    main()
