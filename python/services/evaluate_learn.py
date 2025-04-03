import os
import openai
from openai import OpenAI
from dotenv import load_dotenv


load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=openai_api_key)

model = 'gpt-4o'
temperature = 0.2

def evaluate_learn(eval_texts):
  """
  LLM으로 평가된 학습 데이터들을 기반으로 전반적인 학습 조언 제시
  """

  system_prompt = """
  당신은 청각장애인 발화자의 음성을 평가한 텍스트를 기반으로 학습 조언을 제시하는 평가자입니다.
  
  평가된 텍스트의 공통적인 문제점을 분석하고, 이를 바탕으로 학습자가 개선할 수 있는 방법을 제시합니다.
  평가된 텍스트는 청각장애인 발화자의 발음, 억양, 리듬, 음성 속도, 발화 속도 등 다양한 요소를 포함합니다.
  이 요소들을 종합적으로 고려하여 학습 조언을 작성합니다.

  종합 평가는 각 분야별로 1-2줄 정도로 작성합니다.

  예제:
    발음: '각'을 '갑'으로 발음했어요. '각'의 'ㄱ' 소리를 더 강조해야 해요. 😅
    리듬: 발음 속도가 전반적으로 느리고, 중간에 발화가 끊기는 시간이 길어요. 발음 속도를 조금 더 빠르게 연습해보세요. 😊
    음정: 전반적으로 음정이 안정적이지만 문장이 끝날 때 점점 음정이 내려가는 경향이 있어요. 문장 끝까지 음정을 안정적으로 유지하는는 연습이 필요해요. 😊  
  """

  assist_prompt = """

  """

  user_prompt = f"""
  아래는 학습자에 대한 평가입니다.

  평가 상황: {eval_texts}
  """

  messages = [
      { "role": "system", "content": system_prompt},
      { "role": "user", "content": user_prompt},
      { "role": "assistant", "content": assist_prompt},
  ]

  chat_completion = client.chat.completions.create(
      model=model,
      messages=messages,
      temperature = temperature
  )

  print(f"Evaluating:\n{chat_completion.choices[0].message.content}")

  return chat_completion.choices[0].message.content


eval_texts = """
-학습1
'각'을 '갑'으로 발음했어요. '각'의 'ㄱ' 소리를 더 강조해야 해요. 😅
종성의 'ㄱ'을 발음하는 방법을 다시 학습해보세요. 😊

감탄문에서 피치 변화가 적절히 이루어져서 자연스럽게 발음되었어요. 👍

문장의 속도가 적절하여 듣기 원활해요! 😊

-학습2
'몽골'을 '문골'로 발음했어요. '몽골'의 'ㅇ' 소리를 더 강조해야 해요. 😅
'ㅗ'와 'ㅜ'의 발음 차이를 다시 학습해보세요. 😊

피치의 변화가 조금 불안정해요. 문장 끝에서 피치가 상승해야 해요. 😅

문장의 속도가 조금 느려요. 발음 속도를 조금 더 빠르게 연습해보세요. 😊

-학습3
모든 발음을 정확하게 발음했어요! 👍
이대로 정진하세요! 😊

피치가 전반적으로 안정적이고 양호해요. 👍

문장을 발음하는 평균 속도가 느리고, 중간에 발화가 끊기는 시간이 길어요. 발음 속도를 조금 더 빠르게 연습해보세요. 😊
"""

evaluate_learn(eval_texts)