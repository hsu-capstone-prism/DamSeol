import React from "react";
import "../../../styles/GamePage.css";

const GameScene = () => {
  const handleAnswer = (choice) => {
    alert(`선택한 문장: ${choice}`);
  };

  return (
    <div className="game-container">
      <div className="game-box-wrapper">
        <div className="media-section">
          <video width="100%" controls>
            <source src="/videos/spine.mp4" type="video/mp4" />
            브라우저가 비디오를 지원하지 않습니다.
          </video>
        </div>
        <div className="text-section">
          <p className="description">
            허리 통증으로 진단을 받은 당신에게
            <br />
            의사가 심각한 표정으로 말합니다.
          </p>
          <div className="choices">
            <button onClick={() => handleAnswer("A")}>
              A. 이게 환자분의 척추입니다.
            </button>
            <button onClick={() => handleAnswer("B")}>
              B. 척추가 많이 휘어있습니다.
            </button>
            <button onClick={() => handleAnswer("C")}>
              C. 척추를 한번 살펴보았습니다.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScene;
