import subprocess
import sys

def get_pronun(audio_file):

  cmd = [
      sys.executable,
      "python",
      "./bin/inference.py",
      "--audio_path", audio_file,
      "--model_path", "./outputs/model.pt" 
  ]

  # 실행
  result = subprocess.run(cmd, capture_output=True, text=True, cwd="./services/kospeech_model")
  output = result.stdout

  print("kospeech output: ", output)
  
  return output