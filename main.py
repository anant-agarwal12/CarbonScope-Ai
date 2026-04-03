import sys
from pipeline import process_file

def main():
    file_path = 'sample_data.csv'
    
    # lazy arg parsing
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
        
    print(f"reading from {file_path}...")
    
    out = process_file(file_path)
    if out:
        print("done processing.")
        print(f"=> estimated scope 3 footprint: {out['total_co2']} kg CO2e")

if __name__ == '__main__':
    main()
