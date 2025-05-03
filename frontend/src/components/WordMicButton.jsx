import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import "../styles/StudyPage.css";

const WordMicButton = ({
  selectedIndex,
  word,
  totalWords,
  onUploadComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (totalWords > 0) {
      setStatusList(new Array(totalWords).fill("버튼을 눌러서 녹음하기"));
    }
  }, [totalWords]);

  const updateStatus = (index, message) => {
    setStatusList((prev) => {
      const updated = [...prev];
      updated[index] = message;
      return updated;
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        },
      });
      const audioContext = new AudioContext({ sampleRate: 16000 });
      const source = audioContext.createMediaStreamSource(stream);

      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      source.connect(processor);
      processor.connect(audioContext.destination);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        uploadAudio(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      updateStatus(selectedIndex, "멋진 목소리를 듣고 있어요");
    } catch (err) {
      console.error("Error accessing microphone", err);
      updateStatus(selectedIndex, " 마이크 접근 오류");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      updateStatus(selectedIndex, "");
    }
  };

  const uploadAudio = async (audioBlob) => {
    if (!word || !word.id || isNaN(word.id)) {
      console.error(" 유효하지 않은 word 객체 또는 ID:", word);
      updateStatus(selectedIndex, " 단어 정보 오류");
      return;
    }

    const wordId = word.id;
    const timestamp = Date.now();
    const filename = `${timestamp}.wav`;

    try {
      // 🔧 [1] 리샘플링: 48000Hz → 16000Hz
      const audioContext = new AudioContext();
      const originalBuffer = await audioContext.decodeAudioData(
        await audioBlob.arrayBuffer()
      );

      const offlineContext = new OfflineAudioContext(
        originalBuffer.numberOfChannels,
        16000 * originalBuffer.duration,
        16000
      );

      const source = offlineContext.createBufferSource();
      source.buffer = originalBuffer;
      source.connect(offlineContext.destination);
      source.start(0);

      const renderedBuffer = await offlineContext.startRendering();

      const pcmData = renderedBuffer.getChannelData(0);
      const wavBuffer = encodeWAV(pcmData, 16000);
      const resampledBlob = new Blob([wavBuffer], { type: "audio/wav" });

      // 업로드용 FormData에 리샘플링된 blob 사용
      const formData = new FormData();
      formData.append("audio", resampledBlob, filename);

      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `http://localhost:8080/api/upload/word/${wordId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(" Upload 성공:", result);
        onUploadComplete?.(result);
      } else {
        console.error(" Upload 실패:", response.status);
        updateStatus(selectedIndex, "업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error(" Upload 오류:", error);
      updateStatus(selectedIndex, "오류가 발생했습니다.");
    }
  };

  // [유틸 함수] PCM 데이터를 WAV 형식으로 인코딩
  const encodeWAV = (samples, sampleRate) => {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    const writeString = (offset, str) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    const floatTo16BitPCM = (output, offset, input) => {
      for (let i = 0; i < input.length; i++, offset += 2) {
        let s = Math.max(-1, Math.min(1, input[i]));
        s = s < 0 ? s * 0x8000 : s * 0x7fff;
        output.setInt16(offset, s, true);
      }
    };

    writeString(0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true); // Subchunk1Size (PCM)
    view.setUint16(20, 1, true); // Audio format (1 = PCM)
    view.setUint16(22, 1, true); // Num channels (Mono)
    view.setUint32(24, sampleRate, true); // Sample rate
    view.setUint32(28, sampleRate * 2, true); // Byte rate
    view.setUint16(32, 2, true); // Block align
    view.setUint16(34, 16, true); // Bits per sample
    writeString(36, "data");
    view.setUint32(40, samples.length * 2, true);

    floatTo16BitPCM(view, 44, samples);
    return view;
  };

  return (
    <div className="mic-button-container">
      <button
        className="mic-button"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? (
          <FaStop size={50} color="#3366ff" />
        ) : (
          <FaMicrophone size={50} color="#3366ff" />
        )}
      </button>
      <p className="mic-text">{statusList[selectedIndex]}</p>
    </div>
  );
};

export default WordMicButton;
