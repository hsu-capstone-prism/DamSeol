import subprocess
import sys
import os

def get_pronun(audio_path):
  script_dir = os.path.abspath("./services/kospeech_model")
  cmd = [
      sys.executable,
      "./bin/inference.py",
      "--audio_path", "../../test2.wav",
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