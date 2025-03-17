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

        // 파일명 = selectedIndex.wav (예: 0.wav, 1.wav)
        const fileName = `${selectedIndex}.wav`;

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
