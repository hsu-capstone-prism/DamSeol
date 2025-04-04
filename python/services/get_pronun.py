import subprocess
import sys
import os

def get_pronun(audio_path):
  script_dir = os.path.abspath("./services/kospeech_model")
  inference_dir = os.path.abspath("./services/kospeech_model/bin/inference.py")
  audio_path = os.path.abspath(audio_path)

  print("kospeech file path: ", audio_path)
  print("is audio file exist: ", os.path.exists(audio_path))

  cmd = [
      sys.executable,
      inference_dir,
      "--audio_path", audio_path,
      "--model_path", "./outputs/model.pt" 
  ]

  try:
    result = subprocess.run(cmd, capture_output=True, text=True, check=True, cwd=script_dir)
    output = result.stdout

    print("kospeech output: ", output)
  except subprocess.CalledProcessError as e:
    print("kospeech error: ", e.stderr)
    output = "Error"

  
  
  return output