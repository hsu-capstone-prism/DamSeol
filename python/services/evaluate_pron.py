import os
import openai
import json
from openai import OpenAI
from dotenv import load_dotenv


load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=openai_api_key)

def evaluate_pronunciation(text_original, text_input):
    system_prompt = """
    당신은 청각장애인 발화자의 발음이 적절한지 평가하는 평가자입니다.
    다음 절차에 따라 발음을 평가하십시오.

    1. 텍스트 변환
        - 정답 텍스트와 사용자 발음 텍스트를 한국어 발음 규칙에 맞는 발음 기호에 맞게 변환
        - 예: '청량리역에서 봅시다' -> '청냥니여게서 봅씨다'

    2. 발음 평가
        - 변환된 텍스트를 바탕으로 정답 텍스트와 사용자 발음 텍스트를 비교하여 발음을 평가
        - 정답 텍스트와 사용자 발음 텍스트가 일치하는 경우, 정확한 발음으로 판단
        - 예: 정답 텍스트가 '청냥니여게서 봅씨다', 사용자 텍스트가 '청냥리여게서 봅시다'인 경우 '니-리'와 '씨-시'의 발음이 다르므로 부정확한 발음으로 판단

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
        "reason": "'각'을 '갑'으로 발음했어요. '각'의 'ㄱ' 소리를 더 강조해야 해요. 😅",
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

    try:
        response_json = json.loads(response_message)
    except json.JSONDecodeError:
        print("JSONDecodeError: Invalid JSON format in response.")
        response_json = "Error"

    return response_json