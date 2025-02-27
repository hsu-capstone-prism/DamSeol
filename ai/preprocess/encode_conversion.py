def convert_cp949_to_utf8(input_file_path, output_file_path):
  with open(input_file_path, 'r', encoding='cp949') as input_file:
    content = input_file.read()
  
  with open(output_file_path, 'w', encoding='utf-8') as output_file:
    output_file.write(content)

# Example usage
convert_cp949_to_utf8("csv/kspon_labels.csv", "csv/kspon_labels.csv")