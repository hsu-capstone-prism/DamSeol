import React from "react";
import { FaMicrophone } from "react-icons/fa";
import "../styles/SenStudyPage.css";

const SenMicButton = () => {
  return (
    <div className="mic-button-container">
      <button className="mic-button">
        <FaMicrophone size={50} color="#3366ff" />
      </button>
      <p className="mic-text">버튼을 눌러서 녹음하기</p>
    </div>
  );
};

export default SenMicButton;
