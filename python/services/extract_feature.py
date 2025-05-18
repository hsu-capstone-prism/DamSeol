import librosa
import numpy as np
import io


def extract_pitch_info(audio_path, sr=16000):
    y, sr = librosa.load(audio_path, sr=sr)

    f0, voiced_flag, voiced_probs = librosa.pyin(y, fmin=80, fmax=400)

    times = librosa.times_like(f0, sr=sr)

    pitch_data = [
      {"Time": t, "s, Pitch": pitch, "Hz, Voiced": voiced}
      for t, pitch, voiced in zip(times, f0, voiced_flag)
    ]

    return pitch_data




def extract_speech_rate(audio_path, sr=16000, recognized_text=None):
    """
    음성 데이터에서 초당 발화 속도(Speech Rate)를 계산하는 함수.

    - y: 오디오 신호
    - sr: 샘플링 레이트
    - recognized_text: 인식된 텍스트 (발화된 음절 수를 계산하기 위해 사용)
    """
    y, sr = librosa.load(audio_path, sr=sr)
    duration = librosa.get_duration(y=y, sr=sr)

    syllable_count = len(recognized_text) if recognized_text else 0  # 발화된 음절 수

    speech_rate = syllable_count / duration if duration > 0 else 0  # 초당 발화 속도 계산

        # 4. 라벨 분류
    if speech_rate < 3:
        rate_label = "느림"
    elif 3 <= speech_rate <= 6:
        rate_label = "적절"
    else:
        rate_label = "빠름"

    # 5. LLM 입력용 summary
    summary = (
        f"발화 시간은 총 {round(duration, 2)}초이고, "
        f"음절 수는 {syllable_count}개입니다. "
        f"초당 발화 속도는 약 {round(speech_rate, 2)} 음절/초로 분류 기준에 따라 '{rate_label}'에 해당합니다."
    )

    return {
        "duration_sec": round(duration, 2),
        "syllable_count": syllable_count,
        "speech_rate": round(speech_rate, 2),
        "rate_label": rate_label,
        "summary": summary
    }




def extract_speech_pause_ratio(audio_path, sr=16000, frame_length=0.05, top_db=20):
    """
    음성 데이터에서 시간별 Speech-Pause Ratio를 계산하는 함수.

    - y: 오디오 신호
    - sr: 샘플링 레이트
    - frame_length: 분석할 시간 구간 (초 단위)
    - top_db: 무성 구간 판별 임계값 (낮을수록 더 작은 소리도 포함)
    """
    y, sr = librosa.load(audio_path, sr=sr)
    
    total_duration = len(y) / sr  # 전체 오디오 길이
    hop_length = int(librosa.time_to_frames(frame_length, sr=sr))
    times = np.arange(0, total_duration, frame_length)  # 분석할 시간 구간 설정

    # 음성 구간 검출
    intervals = librosa.effects.split(y, top_db=top_db)

    speech_ratios = []
    for start_time in times:
        end_time = start_time + frame_length
        speech_duration = 0

        # 해당 시간 구간 내에서 발화된 부분의 길이를 계산
        for interval in intervals:
            start, end = interval / sr  # 샘플 단위 -> 초 단위 변환
            if start >= end_time:
                break  # 분석 구간을 벗어나면 중단
            if end > start_time:  # 분석 구간과 겹치는 경우
                speech_duration += min(end, end_time) - max(start, start_time)

        # Speech-Pause Ratio 계산 (발화된 시간 비율)
        speech_ratios.append((start_time, speech_duration / frame_length))

    filtered_speech_ratios = [(round(float(t),2), round(float(r),2)) for t,r in speech_ratios]
    return filtered_speech_ratios  # [(time, speech_pause_ratio), ...]
