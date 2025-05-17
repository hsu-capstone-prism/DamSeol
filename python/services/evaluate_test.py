import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from services.evaluate_speech import get_audio_pitch_eval, get_audio_rhythm_eval, get_spr_eval
from services.extract_feature import extract_speech_rate, extract_pitch_info, extract_speech_pause_ratio

#get_audio_pitch_eval("E:\KsponSpeech\original\KsponSpeech_01\KsponSpeech_0001\KsponSpeech_000001.pcm", "아 모 몬소리야 그건 또")
#get_audio_rhythm_eval("E:\KsponSpeech\original\KsponSpeech_01\KsponSpeech_0001\KsponSpeech_000001.pcm", "아 모 몬소리야 그건 또")

PATH = "C:\\Users\\admin\\Documents\my-project\\project-deaf-learning\\backend\\DamSeol\\uploads\\audio\\1747302910139_audio.wav"

print(get_audio_rhythm_eval(PATH, "이 색상의 한 치수 작은 제품이 있나요?"))
#print(extract_speech_rate(PATH, recognized_text="이 색상의 한 치수 작은 제품이 있나요?"))