import React, { useState, useRef, useEffect } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import "../styles/SenStudyPage.css";

const SenMicButton = ({ selectedIndex, sentences, onUploadComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (sentences.length > 0) {
      setStatusList(new Array(sentences.length).fill("버튼을 눌러서 녹음하기"));
    }
  }, [sentences]);

  const updateStatus = (index, message) => {
    setStatusList((prev) => {
      const updated = [...prev];
      updated[index] = message;
      return updated;
    });
  };

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
      updateStatus(selectedIndex, "🎙️ 녹음 중입니다...");
    } catch (err) {
      console.error("❌ 마이크 접근 오류", err);
      updateStatus(selectedIndex, "❌ 마이크 접근 오류");
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
    const sentence = sentences[selectedIndex];

    if (!sentence || !sentence.id || isNaN(sentence.id)) {
      console.error("❗ 유효하지 않은 sentence 객체 또는 ID:", sentence);
      updateStatus(selectedIndex, "❌ 문장 정보 오류");
      return;
    }

    const sentenceId = sentence.id;
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const formData = new FormData();
    const filename = `${Date.now()}.wav`;
    formData.append("audio", audioBlob, filename);

    const endpoint = `http://localhost:8080/api/upload/sentence/${sentenceId}`;

    console.log("===========================");
    console.log("🎯 업로드 시도 시작");
    console.log("🆔 sentenceId:", sentenceId);
    console.log("🎧 파일 이름:", filename);
    console.log("🔐 Authorization 헤더:", token);
    console.log("📡 요청 경로:", endpoint);
    console.log("===========================");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Content-Type은 FormData일 경우 자동 설정됨, 작성하면 안 됨
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ 업로드 성공:", result);
        updateStatus(selectedIndex, "✅ 업로드 완료!");
        onUploadComplete?.(result);
      } else {
        const errorText = await response.text();
        console.error("❌ 업로드 실패:", response.status, errorText);
        updateStatus(selectedIndex, `❌ 업로드 실패 (${response.status})`);
      }
    } catch (err) {
      console.error("❌ 네트워크 오류 발생:", err);
      updateStatus(selectedIndex, "❌ 네트워크 오류");
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
      <p className="mic-text">{statusList[selectedIndex]}</p>
    </div>
  );
};

export default SenMicButton;
