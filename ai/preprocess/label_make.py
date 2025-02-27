import os
import csv

def label_syllables(dataset_path):
  # Create a dictionary to store the frequency of each syllable
  syllable_freq = {}

  # Iterate through all files in the dataset_path and its subdirectories
  for root, _, files in os.walk(dataset_path):
    for filename in files:
      if filename.endswith(".txt"):
        file_path = os.path.join(root, filename)
        with open(file_path, 'r', encoding='cp949') as file:
          text = file.read().replace('\n', '')  # Ignore line breaks
          for syllable in text:
            if syllable in syllable_freq:
              syllable_freq[syllable] += 1
            else:
              syllable_freq[syllable] = 1

  # Generate the output CSV file name
  output_dir = os.path.join(os.getcwd(), 'csv')
  os.makedirs(output_dir, exist_ok=True)
  output_csv = os.path.join(output_dir, 'kspon_labels.csv')

  # Write the labeled data to a CSV file
  with open(output_csv, 'w', newline='', encoding='utf-8') as csvfile:
    csvwriter = csv.writer(csvfile)
    csvwriter.writerow(['id', 'char', 'freq'])  # Write the header
    for idx, (syllable, freq) in enumerate(syllable_freq.items()):
      csvwriter.writerow([idx, syllable, freq])

# Example usage
dataset_path = 'E:/KsponSpeech/original/KsponSpeech_01'
label_syllables(dataset_path)