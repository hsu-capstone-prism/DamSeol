import React, { useState } from "react";
import "../../../styles/GamePage.css";
import ProgressBar from "../../../components/GameProgressBar";

const GamePage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const games = [
    {
      videoSrc: "/videos/spine.mp4",
      description:
        "허리 통증으로 진단을 받은 당신에게\n의사가 심각한 표정으로 말합니다.",
      choices: [
        "A. 이게 환자분의 척추입니다.",
        "B. 척추가 많이 휘어있습니다.",
        "C. 척추를 한번 살펴보았습니다.",
      ],
    },
    {
      videoSrc: "/videos/neck.mp4",
      description: "목 통증이 지속되어 병원을 찾은 당신에게\n의사가 말합니다.",
      choices: [
        "A. 목 디스크 초기 증상입니다.",
        "B. 일자목이 심각하네요.",
        "C. 스트레칭으로도 개선이 가능합니다.",
      ],
    },
    {
      videoSrc: "/videos/knee.mp4",
      description: "무릎이 아픈 노인을 진료하던 중\n의사가 말합니다.",
      choices: [
        "A. 관절염이 진행되고 있습니다.",
        "B. 연골이 많이 닳았습니다.",
        "C. 물리치료가 필요합니다.",
      ],
    },
    {
      videoSrc: "/videos/heart.mp4",
      description: "가슴 통증으로 병원을 찾은 환자에게\n의사가 말합니다.",
      choices: [
        "A. 심전도 검사가 필요합니다.",
        "B. 협심증일 가능성이 있습니다.",
        "C. 혈압을 자주 체크해야 합니다.",
      ],
    },
  ];

  const current = games[selectedIndex];

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (choice) => {
    setUserAnswers((prev) => [...prev, choice]);

    if (selectedIndex === games.length - 1) {
      setIsFinished(true);
    } else {
      setSelectedIndex((prev) => prev + 1);
    }
  };

  const handleStepClick = (index) => {
    if (index <= selectedIndex) {
      setSelectedIndex(index);
    }
  };

  return (
    <div className="game-container">
      {!started ? (
        <section className="game-section">
          <div className="game-start-screen">
            <p className="game-start-title">
              입을 잘 보고, 마음의 귀를 열어봐요!
            </p>
            <p className="game-start-description">
              소리는 없어요. 화면 속 인물이 어떤 말을 했는지 <br />
              입모양을 보고 가장 어울리는 문장을 골라보세요! <br />
              눈치와 감이 필요한, 조용하지만 웃음 나는 게임 🎉
            </p>
            <button className="game-start-button" onClick={handleStart}>
              Start!
            </button>
          </div>
        </section>
      ) : isFinished && showResult ? (
        <section className="game-section">
          <div className="game-result-screen">
            <h2 className="game-result-title">결과</h2>
            <p className="game-result-description">
              총 점수: {userAnswers.length}/{games.length}점<br />
              평균 점수:{" "}
              {((userAnswers.length / games.length) * 100).toFixed(1)}%
            </p>
            <ul className="game-answer-list">
              {games.map((game, index) => (
                <li key={index}>
                  <strong>Q{index + 1}:</strong>{" "}
                  {game.description.split("\n")[0]}
                  <br />
                  <strong>선택한 답:</strong> {userAnswers[index]}
                </li>
              ))}
            </ul>
            <button
              className="game-home-button"
              onClick={() => (window.location.href = "/")}
            >
              홈으로
            </button>
          </div>
        </section>
      ) : isFinished ? (
        <section className="game-section">
          <div className="game-finish-screen">
            <p className="game-finish-title">🎉 게임 종료!</p>
            <p className="game-finish-description">
              수고하셨습니다! 결과를 확인해보세요.
            </p>
            <button
              className="game-finish-button"
              onClick={() => setShowResult(true)}
            >
              결과 보기
            </button>
          </div>
        </section>
      ) : (
        <section className="game-section">
          <h2>Game</h2>
          <div className="game-box-wrapper">
            <div className="media-section">
              <video width="100%" controls>
                <source src={current.videoSrc} type="video/mp4" />
                브라우저가 비디오를 지원하지 않습니다.
              </video>
            </div>
            <div className="text-section">
              <p className="description">
                {current.description.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
              <div className="choices">
                {current.choices.map((choice, idx) => (
                  <button key={idx} onClick={() => handleAnswer(choice)}>
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <ProgressBar
            currentStep={selectedIndex}
            totalSteps={games.length}
            onStepClick={handleStepClick}
          />
        </section>
      )}
    </div>
  );
};

export default GamePage;
