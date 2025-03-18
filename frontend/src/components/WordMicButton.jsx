import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import "../styles/WordStudyPage.css";

const WordMicButton = ({
  selectedIndex,
  subcategoryId,
  totalWords,
  onUploadComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // 총 단어 수만큼 status 배열 초기화
  useEffect(() => {
    if (totalWords > 0) {
      setStatusList(new Array(totalWords).fill("버튼을 눌러서 녹음하기"));
    }
  }, [totalWords]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
    const formData = new FormData();
    formData.append("audio", audioBlob, "recorded_audio.wav");

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `http://localhost:8080/api/upload/word/${selectedIndex + 1}`,
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
        console.log("Upload 성공:", result);
        if (onUploadComplete) {
          onUploadComplete(result);
        }
      } else {
        console.error("Upload 실패:", response.status);
        updateStatus(selectedIndex, "업로드에 실패했습니다. 😢");
      }
    } catch (error) {
      console.error("Upload 오류:", error);
      updateStatus(selectedIndex, "오류가 발생했습니다.");
    }
  };

  // 단어별 status 갱신 함수
  const updateStatus = (index, message) => {
    setStatusList((prev) => {
      const updated = [...prev];
      updated[index] = message;
      return updated;
    });
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
