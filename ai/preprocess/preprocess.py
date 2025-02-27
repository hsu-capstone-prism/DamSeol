import re

def remove_special_characters(text):
    """
    1. b/, n/, / 등의 잡음 라벨 제거
    2. (철자전사)/(발음전사) 중 발음전사만 남김
    3. (숫자%) 같은 확률 정보 제거
    4. 괄호를 포함한 경우 괄호 없이 텍스트만 남김
    5. 간투어 표현을 위해 사용된 특수문자('/', '*', '+', ',') 제거
    6. 불필요한 공백 제거
    """
    # 1. b/, n/, / 등의 잡음 라벨 제거
    text = re.sub(r'\b[nolbu]/', '', text)  # "b/", "n/" 삭제
    text = text.replace('/', '')  # 기타 '/' 제거

    # 2. (철자전사)/(발음전사) → 발음전사만 남김
    text = transcript_to_pronunciation(text)

    # 3. (70%) 같은 확률 정보 제거
    text = re.sub(r'\(\d+%\)', '', text)

    # 4. 괄호 제거 및 괄호 안 텍스트만 남김
    text = re.sub(r'[()]', '', text)

    # 5. 특수문자 ('*', '+', ',') 제거
    text = re.sub(r'[*+,]', '', text)

    # 6. 불필요한 공백 제거
    text = ' '.join(text.split())

    return text

def transcript_to_pronunciation(text):
    """
    (철자전사)/(발음전사) 형태에서 발음전사만 남김
    """
    pattern = r"\([^)]*\)/\(([^)]*)\)"
    return re.sub(pattern, r"\1", text)

# 테스트 예제
#test = 'b/ 아/ 모+ 몬 소리야 (70%)/(칠 심 퍼센트) 확률이라니 n/'
#print(remove_special_characters(test))  # 출력: "아 모 몬 소리야 칠 심 퍼센트 확률이라니"
