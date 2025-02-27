import re

def remove_special_characters(text):
  text = text.replace('/b', '')
  text = text.replace('/n', '')
  text = text.replace('/', '')

  text = text.replace('*', '')
  text = text.replace('+', '')
  text = text.replace(',', '')

  text = transcript_to_pronunciation(text)

  return text

def transcript_to_pronunciation(text):
    pattern = r"\([^)]*\)/\(([^)]*)\)"
    return re.sub(pattern, r"\1", text)

test = "/b Hello/ (World)/(Word)"
print(remove_special_characters(test)) # Hello Word