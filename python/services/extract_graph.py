import librosa
import librosa.display
import io
import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import gaussian_filter1d

# 실행 명령어 예시
# python3 -c 'import extract_graph; extract_graph.extract_waveform("sample.wav", save_path="waveform.png"); extract_graph.extract_pitch_graph("sample.wav", frame_step=50, save_path="pitch.png")'

def extract_waveform(audio_path, sr=16000, save_path=None):
    """
    오디오 파일에서 웨이브폼을 추출하여 그래프를 생성 
    """
    y, sr = librosa.load(audio_path, sr=sr)
    plt.figure(figsize=(12, 4))
    plt.grid(True, linestyle='--', alpha=0.5)
    librosa.display.waveshow(y, sr=sr, color='royalblue', alpha=0.8)
    plt.title("Waveform", fontsize=14, fontweight='bold')
    plt.xlabel("Time (s)", fontsize=12)
    plt.ylabel("Amplitude", fontsize=12)
    plt.xticks(fontsize=10)
    plt.yticks(fontsize=10)
    plt.gca().set_facecolor('white')  # 배경을 흰색으로 설정
    
    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches='tight', facecolor='white')
        plt.close()
    else:
        print("No save path is provided.")

def extract_pitch_graph(audio_path, sr=16000, frame_step=50, save_path=None, smooth_sigma=2):
    """
    오디오 파일에서 피치 그래프를 추출하여 생성 (부드러운 곡선 적용)
    """
    y, sr = librosa.load(audio_path, sr=sr)
    hop_length = int(sr * (frame_step / 1000))  # ms 단위 -> 샘플 개수 변환
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr, hop_length=hop_length)
    pitch_max = np.nanmax(pitches, axis=0)
    pitch_max[pitch_max == 0] = np.nan  # 0인 부분을 NaN으로 처리하여 시각적으로 제거
    
    # 곡선을 부드럽게 하기 위해 가우시안 필터 적용
    pitch_smoothed = gaussian_filter1d(pitch_max, sigma=smooth_sigma, mode='nearest')
    
    plt.figure(figsize=(12, 4), facecolor='white')  # 전체 배경 흰색 설정
    ax = plt.gca()
    ax.set_facecolor('white')  # 그래프 영역 배경 흰색 설정
    
    time_axis = np.arange(len(pitch_smoothed)) * (frame_step / 1000)  # x축을 시간 단위로 변환
    plt.plot(time_axis, pitch_smoothed, color='blue', linewidth=2.0)  # 부드러운 파란색 곡선 적용
    
    plt.title("Pitch Graph", fontsize=14, fontweight='bold')
    plt.xlabel("Time (s)", fontsize=12)
    plt.ylabel("Frequency (Hz)", fontsize=12)
    plt.xticks(fontsize=10)
    plt.yticks(fontsize=10)
    plt.grid(True, linestyle='--', alpha=0.5)
    
    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches='tight', facecolor='white')
        plt.close()
    else:
        print("No save path is provided.")