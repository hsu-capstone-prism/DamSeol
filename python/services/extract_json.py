import re

def extract_contents(text):
    match = re.search(r'(?:json)?```(?:\w*\n)?(.*?)(?:\n)?```', text, re.DOTALL)

    if match:
        return match.group(1).strip()
    
    return text.strip()
