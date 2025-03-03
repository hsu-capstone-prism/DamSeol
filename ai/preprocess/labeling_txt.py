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
  """
  주어진 텍스트 파일들을 레이블 시퀀스로 변환합니다.
  매개변수:
  csv_path (str): 레이블 CSV 파일 경로.
  txt_path (str): 변환할 텍스트 파일이 저장된 디렉토리 경로.
  텍스트 파일은 'KsponSpeech_'로 시작하고, 길이가 22자 이하인 파일(KsponSpeech_xxxxxx.txt 형식)만 포함됩니다.
  변환된 레이블 시퀀스는 'KsponSpeech_label_'로 시작하는 파일로 저장됩니다.
  Output:
  'KsponSpeech_label_xxxxxx.txt' 형식의 파일이 생성됩니다.
  """
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