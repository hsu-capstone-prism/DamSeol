import csv
import os

def load_labels(csv_path):
  labels = {}
  with open(csv_path, 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
      labels[row['char']] = row['id']
  return labels

def convert_txt_to_labels(txt_path, labels):
  with open(txt_path, 'r', encoding='cp949') as txtfile:
    content = txtfile.read()
  label_sequence = ' '.join(labels.get(char, '') for char in content if char in labels)
  return label_sequence

def convert_labels_to_txt(label_sequence, labels):
  reverse_labels = {v: k for k, v in labels.items()}
  text = ''.join(reverse_labels.get(label, '') for label in label_sequence.split())
  return text

def label_txt(csv_path, txt_path):
  labels = load_labels(csv_path)
  for root, dirs, files in os.walk(txt_path):
    for file in files:
      if file.endswith('.txt') and file.startswith('KsponSpeech_') and len(file) <= 22:
        file_path = os.path.join(root, file)
        label_sequence = convert_txt_to_labels(file_path, labels)
        new_file_name = file.replace('KsponSpeech', 'KsponSpeech_label')
        new_file_path = os.path.join(root, new_file_name)
        with open(new_file_path, 'w', encoding='cp949') as new_file:
          new_file.write(label_sequence)

  #label_sequence = convert_txt_to_labels(txt_path, labels)
  #print(label_sequence)