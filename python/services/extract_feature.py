import librosa
import numpy as np
import io


def extract_pitch_info(audio_file, sr=16000):
    audio_data = io.BytesIO(audio_file) 
    y, sr = librosa.load(audio_data, sr=sr)

    f0, voiced_flag, voiced_probs = librosa.pyin(y, fmin=80, fmax=400)

    times = librosa.times_like(f0, sr=sr)

    pitch_data = [
      {"Time": t, "s, Pitch": pitch, "Hz, Voiced": voiced}
      for t, pitch, voiced in zip(times, f0, voiced_flag)
    ]

    return pitch_data




def extract_speech_rate(audio_file, sr=16000, frame_length=1.0):
    """
    음성 데이터에서 초당 발화 속도(Speech Rate)를 계산하는 함수.

    - y: 오디오 신호
    - sr: 샘플링 레이트
    - frame_length: 분석할 시간 구간 (초 단위)
    """
    audio_data = io.BytesIO(audio_file) 
    y, sr = librosa.load(audio_data, sr=sr)

    # 온셋(발음 시작 지점) 감지
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)

    # 1초 단위로 나누기
    hop_length = int(librosa.time_to_frames(frame_length, sr=sr))
    frames = range(0, len(onset_env), hop_length)
    times = librosa.frames_to_time(frames, sr=sr)

    speech_rates = []
    for i in range(len(frames) - 1):
        start, end = frames[i], frames[i+1]
        onset_count = np.sum(onset_env[start:end] > np.mean(onset_env))  # 강한 온셋만 카운트
        speech_rates.append((times[i], onset_count / frame_length))  # 초당 음절 수 계산

    return speech_rates  # [(time, speech_rate), ...]




def extract_speech_pause_ratio(audio_file, sr=16000, frame_length=1.0, top_db=20):
    """
    음성 데이터에서 시간별 Speech-Pause Ratio를 계산하는 함수.

    - y: 오디오 신호
    - sr: 샘플링 레이트
    - frame_length: 분석할 시간 구간 (초 단위)
    - top_db: 무성 구간 판별 임계값 (낮을수록 더 작은 소리도 포함)
    """
    audio_data = io.BytesIO(audio_file) 
    y, sr = librosa.load(audio_data, sr=sr)
    
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

    return speech_ratios  # [(time, speech_pause_ratio), ...]

