import os
import csv

def create_csv_from_dataset(dataset_path, output_csv):
  """
  주어진 데이터셋 경로에서 텍스트 파일과 대응하는 오디오 파일의 목록을 CSV 파일로 생성합니다.
  매개변수:
  dataset_path (str): 텍스트 파일과 오디오 파일이 저장된 디렉토리 경로.
  output_csv (str): 생성할 CSV 파일의 경로.
  CSV 파일 형식:
  - audio: 오디오 파일 경로 (.pcm 파일)
  - label: 텍스트 파일 경로 (.txt 파일)
  텍스트 파일은 'KsponSpeech_'로 시작하고, 길이가 22자 이하인 파일(KsponSpeech_xxxxxx.txt 형식)만 포함됩니다.
  """
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