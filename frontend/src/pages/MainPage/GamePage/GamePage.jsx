import React from "react";
import "../../../styles/GamePage.css";

const GameScene = () => {
  const handleAnswer = (choice) => {
    alert(`선택한 문장: ${choice}`);
  };

  const gameData = {
    "context": "허리 통증으로 진단을 받은 당신에게 의사가 심각한 표정으로 말합니다.",
    "video": "/videos/spine.mp4",
    "choices": ["A. 이게 환자분의 척추입니다.", "B. 척추가 많이 휘어있습니다.", "C. 척추를 한번 살펴보았습니다."],
    "answer": "A"
  }

  return (
    <div className="game-container">
  <section className="game-section">
    <h2>Game</h2>
    <div className="game-box-wrapper">
      <div className="media-section">
        <video width="100%" controls>
          <source src={gameData.video} type="video/mp4" />
          브라우저가 비디오를 지원하지 않습니다.
        </video>
      </div>
      <div className="text-section">
        <p className="description">
          {gameData.context}
        </p>
        <div className="choices">
          {gameData.choices.map((choice, index) => (
            <button key={index} onClick={() => handleAnswer(choice)}>
              {choice}
            </button>
          ))}
        </div>
      </div>
    </div>
  </section>
</div>
  );
};

export default GameScene;
