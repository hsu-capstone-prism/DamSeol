import os
import openai
from openai import OpenAI
from evaluate_speech import extract_pitch_info, extract_speech_pause_ratio, extract_speech_rate

os.environ['OPENAI_API_KEY'] = 'sk-4...'

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)



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

  답변은 다음 양식을 따라야 합니다.

  평가: 나쁨 또는 보통 또는 좋음
  점수: 1~5점 (0~5점 사이로 채점한 정량적 점수)
  이유: 위와 같이 평가한 근거를 1줄 정도로 짧고 명확하게 제시할 것. '해요'체로 작성하고 이모티콘을 적절히 사용할 것

  예제:
  평가: 보통 
  점수: 3/5점  
  이유: 감탄문이지만 피치 변화가 크지 않아서 덜 자연스러워요. 🤔
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

  chat_completion = client.chat.completions.create(
      model="gpt-4o",
      messages=messages,
      temperature = 0.2
  )

  print(f"Evaluating:\n{chat_completion.choices[0].message.content}")



def get_audio_rhythm_eval(audio_file, text, situation):
  audio_speech_pause_ratio = extract_speech_pause_ratio(audio_file)
  audio_speech_rate = extract_speech_rate(audio_file)

  if(situation == None):
    situation = "일반적인 대화 상황"

  system_prompt = """
  당신은 청각장애인 발화자의 음성이 적절한지 평가하는 평가자입니다.
  다음 기준을 참고하여 발화자의 리듬(발화 속도 및 발화 중단 비율)이 적절한지 평가하십시오.

  평가 기준  
  1. 발화 속도(Speech Rate)
    - 정상적인 대화 속도: 4~6 음절/초 (syllables/sec)  
    - 3 이하: 너무 느림 → 부자연스럽거나 전달력이 약해질 가능성이 있음  
    - 7 이상: 너무 빠름 → 청취 난이도가 높아질 가능성이 있음  

  2. 발화 중단 비율(Speech Pause Ratio)
    - 일반적인 비율: 0.3~0.5 (발화 시간 비율)  
    - 0.7 이상: 지나치게 말을 끊지 않고 발화 → 부자연스러울 수 있음  
    - 0.2 이하: 지나치게 말을 끊어 말함 → 어색할 수 있음  

  3. 문장 길이와 조합 고려
    - 짧은 문장에서 긴 정적(pause)이 많으면 어색할 수 있음  
    - 긴 문장에서 지나치게 빠른 속도로 말하면 청취 난이도가 높아질 수 있음  

  평가 방법  
  - 오직 제공된 Speech Rate와 Speech Pause Ratio만 반영하여 평가  
  - 문맥과 상황을 고려하여 지나치게 빠르거나 느린 경우 부자연스러움 판단  
  - 평가 대상이 청각장애인임을 고려하여 평가 진행  

  답변 양식
  ```
  평가: 나쁨 또는 보통 또는 좋음
  점수: 1~5점 (0~5점 사이로 채점한 정량적 점수)
  이유: 위와 같이 평가한 근거를 1줄 정도로 짧고 명확하게 제시할 것. '해요'체로 작성하고 이모티콘을 적절히 사용할 것
  ```
  
  ### 예시
  ```
  평가: 나쁨
  점수: 2/5점
  이유: 긴 문장인데 발화 속도가 8 syllables/sec로 너무 빨라서 듣기 어려워요. 😵
  ```
  """

  assist_prompt = """
  Speech-Pause Ratio는 1초 동안 발화한 시간의 비율입니다. (범위: 0~1)  
    - 1이면 지속적으로 발화 중  
    - 0이면 완전한 침묵  

  Speech Rate는 초당 발화 속도입니다. (syllables/sec)  
    - 4~6: 정상적인 대화 속도  
    - 3 이하: 너무 느림  
    - 7 이상: 너무 빠름  

  평가 시 참고 사항:  
  - 문장이 길수록 속도가 너무 빠르면 부자연스럽다.  
  - 문장이 짧을수록 긴 정적(pause)은 부자연스럽다.  
  - Speech-Pause Ratio가 0.2 이하라면 말을 지나치게 끊어 말할 가능성이 높다.  
  - Speech-Pause Ratio가 0.7 이상이면 거의 멈추지 않고 말하여 어색할 수 있다.  
  """

  user_prompt = f"""
  아래는 제공되는 오디오의 피치 정보와 텍스트입니다.

  ```
  평가 상황: {situation}

  Speech Rate: {audio_speech_rate}

  Speech Pause Ratio: {audio_speech_pause_ratio}

  텍스트: {text}
  ```
  """

  messages = [
      { "role": "system", "content": system_prompt},
      { "role": "user", "content": user_prompt},
      { "role": "assistant", "content": assist_prompt},
  ]

  chat_completion = client.chat.completions.create(
      model="gpt-4o",
      messages=messages,
      temperature = 0.1
  )

  print(f"Evaluating:\n{chat_completion.choices[0].message.content}")
