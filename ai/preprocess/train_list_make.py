import os
import csv

def create_csv_from_dataset(dataset_path, output_csv):
  with open(output_csv, mode='w', newline='', encoding='utf-8') as csv_file:
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow(['audio', 'label'])

    for root, _, files in os.walk(dataset_path):
      for file in files:
        if file.endswith('.txt') and file.startswith('KsponSpeech_') and len(file) <= 22:
          txt_path = file

          pcm_path = txt_path.replace('.txt', '.pcm')
          txt_path = txt_path.replace('KsponSpeech_', 'KsponSpeech_label_')
          
          csv_writer.writerow([pcm_path, txt_path])

#if __name__ == "__main__":
#  dataset_path = "E:/KsponSpeech/original/KsponSpeech_01/KsponSpeech_0001"
#  output_csv = "csv/train_list.csv"
#  create_csv_from_dataset(dataset_path, output_csv)