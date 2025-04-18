import re

def extract_contents(text):
    match = re.search(r'(?:json)?```(?:\w*\n)?(.*?)(?:\n)?```', text, re.DOTALL)

    if match:
        content = match.group(1)
        if content:
            return content.strip()
    
    return text
