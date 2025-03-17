import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import "../styles/WordStudyPage.css";

const WordMicButton = ({ selectedIndex }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [statusText, setStatusText] = useState("버튼을 눌러서 녹음하기");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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
        const audioUrl = URL.createObjectURL(blob);

        // 현재 URL 경로 가져오기
        const path = window.location.pathname; // 예: /phon/consonant/words/11
        const cleanPath = path.slice(1).replace(/\//g, "_"); // 예: phon_consonant_words_11

        // 파일명 생성
        const fileName = `${cleanPath}_${selectedIndex}.wav`;

        const link = document.createElement("a");
        link.href = audioUrl;
        link.download = fileName;
        link.click();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setStatusText("멋진 목소리를 듣고 있어요");
    } catch (err) {
      console.error("Error accessing microphone", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setStatusText("녹음이 완료되었습니다!");
    }
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
      <p className="mic-text">{statusText}</p>
    </div>
  );
};

export default WordMicButton;
