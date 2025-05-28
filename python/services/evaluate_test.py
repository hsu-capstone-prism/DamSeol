import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from services.evaluate_speech import get_audio_pitch_eval, get_audio_rhythm_eval, get_spr_eval
from services.extract_feature import extract_speech_rate, extract_pitch_info, extract_speech_pause_ratio
from services.evaluate_pron import evaluate_pronunciation

#get_audio_pitch_eval("E:\KsponSpeech\original\KsponSpeech_01\KsponSpeech_0001\KsponSpeech_000001.pcm", "아 모 몬소리야 그건 또")
#get_audio_rhythm_eval("E:\KsponSpeech\original\KsponSpeech_01\KsponSpeech_0001\KsponSpeech_000001.pcm", "아 모 몬소리야 그건 또")

PATH = "/Users/cumoon/Documents/DamSeol/python/data/1.wav"

#print(get_audio_pitch_eval(PATH, "안녕하세요? 저는 몽골에서 온 자가라고 해요."))
#print(get_audio_rhythm_eval(PATH, "안녕하세요 저는 몽골에서 온 자가라고 해요"))
#evaluate_pronunciation("사용자 발음", "정답 텍스트")
#evaluate_pronunciation("면접질문리스트를 사전에 정리해서 공유해주세요.", "면접 질문 리스트를 사전에 정리해서 공유해 주세요.")
#문제점1.(실라vs신라 발음)-해결완
#evaluate_pronunciation("박물관에서 본 실라시대 유물들이 인상적이었어요.","박물관에서 본 신라시대 유물들이 정말 인상적이었어요.")
#문제점2. (띄어쓰기)-해결완
#evaluate_pronunciation("추운날에는 따뜻한 고기국을 한그릇 먹으면 몸이 금방 따뜻해져요.","추운 날에는 따뜻한 고기국을 한 그릇 먹으면 몸이 금방 따뜻해져요.")
#문제점 1,2 test
#evaluate_pronunciation("카드결제시 할인이 적용되나요?","카드 결제 시 할인이 적용되나요?")
#evaluate_pronunciation("큰 배낭은 앞으로 메야 합니다.","큰 배낭은 앞으로 메야 합니다.")

#print(extract_speech_rate(PATH, recognized_text="이 색상의 한 치수 작은 제품이 있나요?"))