import os
import openai
import json
from openai import OpenAI
from dotenv import load_dotenv
from services.extract_feature import extract_pitch_info, extract_speech_pause_ratio, extract_speech_rate
from services.extract_json import extract_contents

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=openai_api_key)

model = 'gpt-4o'
temperature = 0.4


def get_audio_pitch_eval(audio, text, situation=None):

  audio_pitch = extract_pitch_info(audio)
  if(situation == None):
    situation = "일반적인 대화 상황"

  system_prompt = """
  당신은 청각장애인 발화자의 음성이 적절한지 평가하는 평가자입니다.
  다음 기준을 참고하여 음성의 피치가 적절한지 평가하십시오.

  1. 평균 피치 변화: 텍스트의 유형에 따라 평균 피치가 너무 낮거나 높은 경우 부자연스럽다고 판단  
    - 일반 서술문: 피치 변화가 크지 않음  
    - 질문 문장: 문장 끝에서 피치가 상승해야 함  
    - 감탄문: 전반적으로 피치 변화가 커야 함  
    
  2. 피치의 일관성: 같은 유형의 문장이 반복될 때 피치 패턴이 일관되지 않으면 부자연스럽다고 판단  

  3. 문맥 적절성: 문장의 분위기에 비해 피치가 너무 단조롭거나 과도하게 변화하면 부자연스럽다고 판단  

  - 음성을 평가할 때에는 오직 음정(pitch)에 대한 정보만 반영하십시오.
  - 일반인이 들었을 때 어색한 정도를 객관적인 관점에서 평가하십시오.
  - 평가 대상이 청각장애인임을 고려하여 평가를 진행하십시오.
  - 일반인이 이해할 수 있도록 어려운 표현 대신 간단하고 명료한 표현을 사용할 것

  응답은 반드시 json 양식을 따라야 하며, 출력에 백틱이나 따옴표는 포함하지 않아야 합니다.

  평가: 나쁨 또는 보통 또는 좋음
  점수: 1~5점 (0~5점 사이로 채점한 정량적 점수)
  이유: 위와 같이 평가한 근거를 1줄 정도로 짧고 명확하게 제시할 것. '해요'체로 작성하고 이모티콘을 적절히 사용할 것

  예제:
  {
    "pitch_assess": "좋음",
    "pitch_score": "4/5점",
    "pitch_reason": "감탄문에서 피치 변화가 적절히 이루어져서 자연스럽게 발음되었어요. 👍"
  }

  """

  assist_prompt = """
  평가 시 유의사항:  
  - 질문 형식의 문장은 문장 끝에서 피치가 상승해야 함  
  - 감탄문("와!", "대박!")은 평균보다 피치 변화가 커야 자연스러움  
  - 평서문은 피치 변화가 적어야 함  
  - 같은 유형의 문장이 반복될 때, 피치 패턴이 일관되어야 자연스럽게 들림  
  """

  user_prompt = f"""
  아래는 제공되는 오디오의 피치 정보와 텍스트입니다.

  평가 상황: {situation}  
  오디오 정보: ```{audio_pitch}```
  텍스트: {text}
  """

  messages = [
      { "role": "system", "content": system_prompt},
      { "role": "user", "content": user_prompt},
      { "role": "assistant", "content": assist_prompt},
  ]

  response = client.chat.completions.create(
      model=model,
      messages=messages,
      temperature = temperature
  )

  response_message = response.choices[0].message.content

  response_message = extract_contents(response_message)

  print("사용자 Pitch 평가 ----")
  print(response_message)

  try:
    response_json = json.loads(response_message)
  except json.JSONDecodeError:
    print("JSONDecodeError: Invalid JSON format in response.")
    response_json = "Invalid: " + response_message

  return response_json



def get_audio_rhythm_eval(audio_file, text, situation=None):
  #audio_speech_pause_ratio = extract_speech_pause_ratio(audio_file)
  audio_spr_eval = get_spr_eval(audio_file, text)
  audio_speech_rate = extract_speech_rate(audio_file, recognized_text=text)

  if(situation == None):
    situation = "일반적인 대화 상황"

  system_prompt = """
  당신은 청각장애인 발화자의 리듬(발화 속도 및 발화 중단 비율)이 적절한지 평가하는 평가자입니다.
  학습자의 발화를 평가할 때, 지나치게 엄격하기보다는 실질적인 의사소통 가능성과 학습자의 노력을 고려한 공정하고 온건한 기준을 적용하십시오.
  제공된 데이터를 기반으로 발화가 자연스러운지를 객관적으로 평가하십시오.

  📌 평가 기준
  1. 발화 속도 (Speech Rate)
  - 정상 범위: 4~6 syllables/sec
  - 3 이하: 느림 → 부자연스럽거나 전달력이 약할 수 있음
  - 7 이상: 빠름 → 청취가 어려울 수 있음

  2. 발화 중단 비율 (Speech Pause Ratio)
  - 발화 중단 비율에 대한 평가는 다른 AI 모델이 진행한 후 전달합니다.

  3. 문장 길이 고려
  - 짧은 문장에서 2초 이상의 긴 정적이 반복되면 부자연스럽게 느껴질 수 있음
  - 긴 문장에서 지나치게 빠른 속도는 청취 난이도를 높일 수 있음

  📌 평가 방법
  - 반드시 주어진 기본 평가 내용을 직접 분석하여 평가하십시오.
  - 수치 분석 없이 인상이나 느낌으로 빠르다/느리다를 판단하는 것은 허용되지 않습니다.
  - 제공된 데이터를 기반으로 논리적이고 일관성 있게 평가하십시오.
  - 일반인이 이해할 수 있도록 간단하고 명료한 표현을 사용하십시오.
    (예: "발화 속도가 빠른 편이에요", "발화가 중간에 끊겨요" 등)
  - 평가 대상이 청각장애인임을 고려하여 

  📌 답변 형식 (JSON, RFC8259 준수)
  (출력에 백틱이나 큰따옴표 생략 금지)

  {
    "rhythm_assess": "나쁨" 또는 "보통" 또는 "좋음",
    "rhythm_score": "n/5점",   // 1~5점 중 하나
    "rhythm_reason": "간결한 이유를 '해요'체로 1줄 작성하고 이모티콘을 넣을 것",
  }

  📌 주의사항
  - 예시 문구를 복사하거나 단순 변형하지 말고, 실제 데이터를 분석하여 새로운 문장을 작성하십시오.
  - 키(key)와 값(value) 모두 큰따옴표(")를 사용하여 정확한 JSON을 출력하십시오.
  """

  assist_prompt = """

  📌 Speech Rate 데이터 해석 방법
  - 초당 음절 수 (syllables/sec)
  - 4~6 범위: 정상
  - 3 이하: 너무 느림
  - 7 이상: 너무 빠름

  🛠 평가 시 참고
  - 긴 문장에서 지나치게 빠르면 청취가 어렵게 느껴질 수 있음
  """

  user_prompt = f"""
  아래는 제공되는 오디오의 피치 정보와 텍스트입니다.

  ```
  평가 상황: {situation}

  Speech Rate: {audio_speech_rate}

  Speech Pause Ratio 평가 내용: {audio_spr_eval}

  텍스트: {text}
  ```
  """

  messages = [
      { "role": "system", "content": system_prompt},
      { "role": "user", "content": user_prompt},
      { "role": "assistant", "content": assist_prompt},
  ]

  response = client.chat.completions.create(
      model=model,
      messages=messages,
      temperature = temperature
  )

  response_message = response.choices[0].message.content

  response_message = extract_contents(response_message)

  print("사용자 Rhythm 평가 ----")
  print(response_message)

  try:
    response_json = json.loads(response_message)
  except json.JSONDecodeError:
    print("JSONDecodeError: Invalid JSON format in response.")
    response_json = "Invalid: " + response_message

  return response_json

def get_spr_eval(audio, text):
  audio_speech_pause_ratio = extract_speech_pause_ratio(audio)

  system_prompt = """
  당신은 청각장애인 발화자의 발화 중단 비율(Speech Pause Ratio)이 적절한지 평가하는 평가자입니다.
  학습자의 발화를 평가할 때, 지나치게 엄격하기보다는 실질적인 의사소통 가능성과 학습자의 노력을 고려한 공정하고 온건한 기준을 적용하십시오.
  제공된 데이터를 기반으로 발화가 자연스러운지를 객관적으로 평가하십시오.

  📌 평가 기준
  발화 중단 비율 (Speech Pause Ratio)
  - Speech Pause Ratio가 0.2 미만인 값이 연속될 때, **각 포인트 간 시간 간격을 계산하여** 누적하여 합산하십시오.
  - 정적 지속 시간은 "연속된 데이터 포인트의 시간 차이"를 합산하여 계산합니다.  
    - 예: (0.7, 0.0), (0.75, 0.0), (0.8, 0.0)은 총 0.1초 정적입니다.
  - 총합이 2초 이상이면 긴 정적(pause)으로 간주하고 부자연스럽게 평가합니다.
  - 단일 포인트가 0인 경우가 연속적으로 이어지더라도, 계산한 정적 시간이 **2초 미만**이면 자연스러운 흐름으로 간주합니다.
  - 시작 시간과 종료 시간만 단순히 빼서 계산하는 것은 허용되지 않습니다.
  - 녹음 시작 직후와 녹음 종료 직전의 정적은 평가 대상에서 제외합니다.

  """

  assist_prompt = """
  📌 Speech Pause Ratio 데이터 해석 방법
  Speech-Pause Ratio 데이터 해석 방법
  - 포맷: (Second, Speech Pause Ratio) 배열 형태
  - 연속된 0.2 미만 값들의 지속 시간은 각 포인트 간 시간 간격을 누적하여 합산합니다.
    (ex: 0.05초 간격이면 20개 연속 = 1초 정적)
  - 단순히 시작-끝 시간 차이만 보는 것은 잘못된 방식입니다.
  - 총합이 2초 이상일 경우 긴 정적으로 간주합니다.
  - 2초 미만은 자연스러운 흐름으로 간주합니다.
  - 녹음 종료 직전 1초 이내 정적은 평가에서 제외합니다.
  """
  user_prompt = f"""
  아래는 제공되는 오디오의 정보입니다.
  {audio_speech_pause_ratio}  
  """

  messages = [
      { "role": "system", "content": system_prompt},
      { "role": "user", "content": user_prompt},
      { "role": "assistant", "content": assist_prompt},
  ]

  response = client.chat.completions.create(
      model=model,
      messages=messages,
      temperature = temperature
  )
  response_message = response.choices[0].message.content

  print("사용자 Speech Pause Ratio 평가 ----")
  print(response_message)
  return response_message