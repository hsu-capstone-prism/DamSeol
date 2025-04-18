import subprocess
import sys
import os
import re

def get_pronun(audio_path):
  script_dir = os.path.abspath("./services/kospeech_model")
  inference_dir = os.path.abspath("./services/kospeech_model/bin/inference.py")
  audio_path = os.path.abspath(audio_path)

  print("input speech file path: ", audio_path)

  cmd = [
      sys.executable,
      inference_dir,
      "--audio_path", audio_path,
      "--model_path", "./outputs/model.pt" 
  ]

  try:
    result = subprocess.run(cmd, capture_output=True, text=True, check=True, cwd=script_dir, encoding='utf-8')
    output = result.stdout

    print("kospeech output: ", output)
  except subprocess.CalledProcessError as e:
    print("kospeech error: ", e.stderr)
    output = "Error"

  if output is None:
    output = "Get Pronunciation Error"

  clean_output = get_clean_text(output)
  
  return clean_output

def get_clean_text(text):
  # 대괄호, 따옴표, 개행 문자 제거
  text = text.strip("[]'\n")

  # <sos> 태그 제거
  text = text.replace("<sos>", "")

  # 중복 공백 제거
  text = re.sub(r'\s+', ' ', text) 

  return text
