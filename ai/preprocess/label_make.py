import os
import csv
from preprocess.text_preprocess import remove_special_characters

def label_syllables(dataset_path):
  """
  데이터셋의 모든 음절에 대한 레이블을 생성합니다.
  매개변수:
  dataset_path (str): 음절 레이블을 생성할 데이터셋 경로.
  CSV 파일 형식:
  - id: 음절 ID
  - char: 음절
  - freq: 음절 빈도
  """
  # Create a dictionary to store the frequency of each syllable
  syllable_freq = {}

  # Iterate through all files in the dataset_path and its subdirectories
  for root, _, files in os.walk(dataset_path):
    for filename in files:
      if filename.endswith(".txt") and filename.startswith("KsponSpeech_") and len(filename) <= 22:
        file_path = os.path.join(root, filename)
        with open(file_path, 'r', encoding='cp949') as file:
          text = file.read().replace('\n', '')  # Ignore line breaks
          text = remove_special_characters(text)  # Remove special characters
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
#dataset_path = 'E:/KsponSpeech/original/KsponSpeech_01/KsponSpeech_0001'
#label_syllables(dataset_path)