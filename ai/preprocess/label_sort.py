import csv

def sort_csv_by_freq(csv_path):
  with open(csv_path, 'r', encoding='utf-8') as csvfile:
    csvreader = csv.reader(csvfile)
    header = next(csvreader)  # Skip the header
    rows = [row for row in csvreader]

  # Sort rows by frequency in descending order
  rows.sort(key=lambda x: int(x[2]), reverse=True)

  # Reassign IDs based on the new order
  for idx, row in enumerate(rows):
    row[0] = str(idx + 1)

  # Write the sorted data back to the CSV file
  with open(csv_path, 'w', newline='', encoding='cp949') as csvfile:
    csvwriter = csv.writer(csvfile)
    csvwriter.writerow(header)  # Write the header
    csvwriter.writerows(rows)

# Sort the CSV file by frequency
sort_csv_by_freq("csv/kspon_labels.csv")