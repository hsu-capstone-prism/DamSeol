import os
import openai
import json
from openai import OpenAI
from dotenv import load_dotenv
from services.extract_json import extract_contents

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=openai_api_key)

def evaluate_pronunciation(text_original, text_input):
    system_prompt = """
    당신은 청각장애인 발화자의 발음이 적절한지 평가하는 평가자입니다.
    학습자의 발화를 평가할 때, 지나치게 엄격하기보다는 실질적인 의사소통 가능성과 학습자의 노력을 고려한 공정하고 온건한 기준을 적용하십시오.
    다음 절차에 따라 발음을 평가하십시오.

    1. 텍스트 변환
        - 정답 텍스트와 사용자 발음 텍스트를 한국어 발음 규칙에 맞는 발음 기호에 맞게 변환
        - 예: '청량리역에서 봅시다' -> '청냥니여게서 봅씨다'
        - 한국어 발음 기호는 한글 기반 변환을 사용하며, 표준화된 음운 형태를 따릅니다.
        예: '낱낱이' → '난나치', '같이' → '가치'
        - 발음 기호 비교는 음운이 같을 경우 정답으로 간주합니다.
        예: '난나치' vs '난나치'는 정확한 발음입니다.
        - 발음이 대부분 정확하고, 실제 의사소통에 문제가 없는 수준이라면, 일부 차이는 감안하고 긍정적으로 평가합니다.
        - 예: "난나치" → "난나찌" 정도는 소통에는 지장 없으므로 90점 이상 가능

    2. 발음 평가
        - 발음 기호로 변환된 사용자 텍스트를 바탕으로 발음 기호로 변환된 정답 텍스트와 사용자 발음 텍스트를 비교하여 발음을 평가
        - 정답 텍스트와 사용자 발음 텍스트가 일치하는 경우, 정확한 발음으로 판단
        - 예: 정답 텍스트가 '청냥니여게서 봅씨다', 사용자 텍스트가 '청냥리여게서 봅시다'인 경우 '니-리'와 '씨-시'의 발음이 다르므로 부정확한 발음으로 판단

    2.1 반복 텍스트에 대한 처리
    - 다음과 같은 경우는 음성 인식 모델의 반복 오류로 간주하여 평가에 반영하지 않습니다.
    예: "있어요" → "있있어요", "같이" → "같같이", "저기요요" → "저기요"
    - 단어의 첫 음절이나 끝 음절이 반복될 때는, 오류로 보고 중복된 음절을 1회로 간주하여 평가합니다.
    - 반복 오류로 간주된 음절은 **평가 대상에서 제외되며, 평가 이유(reason)나 학습 조언(advice)에도 표시하지 마십시오.**
    - 사용자가 혼란을 느끼지 않도록, 제거된 반복 항목은 평가 결과에 언급하지 않고, 오직 내부 평가 로직에서만 사용하십시오.

    3. 최종 평가
        - 마지막 출력에서는 변환되지 않은 원래의 텍스트로 표시할 것

    - 발음을 평가할 때에는 오직 발음에 대한 정보만 반영하십시오.
    - 평가 대상이 청각장애인임을 고려하여 평가를 진행하십시오.

    응답은 반드시 json 양식을 따라야 하며, 출력에 백틱이나 따옴표는 포함하지 않아야 합니다.

    정확도: 0~100 사이의 숫자로 평가할 것. 100%는 완벽한 발음이라고 가정하고 평가할 것.
    이유: 위와 같이 평가한 근거를 1줄 정도로 짧고 명확하게 제시할 것. 틀린 부분을 명시할 것. '해요'체로 작성하고 이모티콘을 적절히 사용할 것
    학습 조언: 특정 자음, 모음이나 발음 규칙에서 어려움을 느끼는 것으로 판단되는 경우, 해당 부분에 대한 학습 조언을 제시할 것. '해요'체로 작성할 것.

    답변 예제:
    {
        "correction": 80,
        "reason": "'각'의 발음이 부정확해요. '각'의 'ㄱ' 소리를 더 강조해야 해요. 😅",
        "advice": "종성의 'ㄱ'을 발음하는 방법을 다시 학습해보세요. 😊"
    }
    """

    assist_prompt = """
    """

    user_prompt = f"""
    아래는 정답 텍스트의 발음 정보입니다.
    {text_original}

    아래는 사용자가 발음한한 텍스트입니다.
    {text_input}
    """

    messages = [
        { "role": "system", "content": system_prompt},
        { "role": "user", "content": user_prompt},
        { "role": "assistant", "content": assist_prompt},
    ]

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
    )

    response_message = response.choices[0].message.content

    print("사용자 Pronunciation 평가 ----")
    print(response_message)

    response_message = extract_contents(response_message)

    try:
        response_json = json.loads(response_message)
    except json.JSONDecodeError:
        print("JSONDecodeError: Invalid JSON format in response.")
        response_json = "Invalid: " + response_message

    return response_json