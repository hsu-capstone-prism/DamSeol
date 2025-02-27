
from definition import DATASET_PATH
from preprocess.label_make import label_syllables
from preprocess.label_sort import sort_csv_by_freq
from preprocess.encode_conversion import convert_cp949_to_utf8
from preprocess.train_list_make import create_csv_from_dataset
from preprocess.labeling_txt import label_txt

if __name__ == '__main__':
  print("Start preprocessing...")
  # Define the dataset path
  dataset_path = DATASET_PATH
  
  # Create a CSV file with syllable labels
  label_syllables(dataset_path)
  print("Labeling is done.")


  # Sort the CSV file by frequency
  sort_csv_by_freq("csv/kspon_labels.csv")
  print("Sorting is done.")
  
  # Convert the CSV file encoding from cp949 to utf-8
  convert_cp949_to_utf8("csv/kspon_labels.csv", "csv/kspon_labels.csv")
  print("Encoding conversion is done.")

  # Create a CSV file with the training list
  create_csv_from_dataset(dataset_path, "csv/train_list.csv")
  print("Creating the training list is done.")
  
  # Label the text files
  label_txt("csv/kspon_labels.csv", dataset_path)
  print("Preprocessing is done.")

