import csv
import json

# Simulated legacy data in a CSV format (could also be a text file or JSON)
data_file = 'legacy_data.csv'

# Function to generate sample data
def generate_data():
    # Example data with missing or inconsistent fields
    data = [
        {'id': '1', 'name': 'John Doe', 'email': 'john@example.com'},
        {'id': '2', 'name': 'Jane Smith', 'email': ''},  # Missing email
        {'id': '3', 'name': 'Alice', 'email': 'alice@example.com'},
        {'id': '4', 'name': '', 'email': 'bob@example.com'},  # Missing name
    ]

    # Write the sample data to a CSV file
    with open(data_file, 'w', newline='') as csvfile:
        fieldnames = ['id', 'name', 'email']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for row in data:
            writer.writerow(row)

# Function to read data from the legacy system file
def read_data():
    with open(data_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        data = [row for row in reader]
        return data

# Function to simulate inconsistent data formats or missing fields
def simulate_inconsistent_data():
    data = read_data()
    # Print out the inconsistent data to simulate a legacy system problem
    for row in data:
        print(row)

# Run the legacy system simulation
generate_data()
simulate_inconsistent_data()
