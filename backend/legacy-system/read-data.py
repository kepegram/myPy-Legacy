import csv
import os

def read_legacy_data(file_path):
    data = []
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            if len(row) == 3:  # Ensure the row has all fields
                data.append({
                    'id': int(row[0]),
                    'name': row[1].strip(),
                    'email': row[2].strip()
                })
    return data

if __name__ == "__main__":
    base_path = os.path.dirname(__file__)
    file_path = os.path.join(base_path, 'data', 'users.txt')
    users = read_legacy_data(file_path)
    print(users)
