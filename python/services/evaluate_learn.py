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
  

  예제:
  평가: 보통 
  점수: 4/5점  
  이유: 감탄문에서 피치 변화가 적절히 이루어져서 자연스럽게 발음되었어요. 👍
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
