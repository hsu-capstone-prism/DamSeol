import React, { useState } from "react";
import "../../../styles/GamePage.css";

const GamePage = () => {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (choice) => {
    alert(`선택한 문장: ${choice}`);
  };

  return (
    <div className="game-container">
      {!started ? (
        <section className="game-section">
          <h2 className="game-title">👄 입을 잘 보고, 마음의 귀를 열어봐요!</h2>
          <div className="game-start-screen">
            <p className="game-description">
              소리는 없어요. 화면 속 인물이 어떤 말을 했는지 <br />
              입모양을 보고 가장 어울리는 문장을 골라보세요! <br />
              눈치와 감이 필요한, 조용하지만 웃음 나는 게임 🎉
            </p>
            <button className="game-start-button" onClick={handleStart}>
              Start!
            </button>
          </div>
        </section>
      ) : (
        <section className="game-section">
          <h2>Game</h2>
          <div className="game-box-wrapper">
            <div className="media-section">
              <video width="100%" controls>
                <source src="/videos/spine.mp4" type="video/mp4" />
                브라우저가 비디오를 지원하지 않습니다.
              </video>
            </div>
            <div className="text-section">
              <p className="description">
                화면 속 인물이 말을 합니다. <br />
                입모양을 보고 어떤 말인지 맞춰보세요.
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
        </section>
      )}
    </div>
  );
};

export default GamePage;
