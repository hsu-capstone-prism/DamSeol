import React, { useState } from "react";
import "../../../styles/GamePage.css";
import gameData from "./GameData";
import GameVideo from "../../../components/GameVideo";

const GameScene = () => {

  const [index, setIndex] = useState(1);

  const [selectedGameData, setSelectedGameData] = useState(gameData[index]);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [answerStatus, setAnswerStatus] = useState(null);


  const handleAnswer = (choiceIndex) => {
    if (choiceIndex === selectedGameData.answer) {
      setAnswerStatus("정답입니다!");
    } else {
      setAnswerStatus("오답입니다!");
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = (currentIndex + 1) % gameData.length;
    setCurrentIndex(nextIndex);
    setSelectedGameData(gameData[nextIndex]);
    setAnswerStatus(null);
  };

  return (
    <div className="game-container">
      <section className="game-section">
        <h2>Game</h2>
        <div className="game-box-wrapper">
          <div className="media-section">
            <GameVideo videoSrc={selectedGameData.video} />
          </div>
          <div className="text-section">
            <p className="description">
              {selectedGameData.context}
            </p>
            
            {answerStatus && (
              <div className="answer-status">
                <p className={answerStatus.includes("정답") ? "correct" : "incorrect"}>
                  {answerStatus}
                </p>
                <button className="next-button" onClick={handleNextQuestion}>
                  다음 문제
                </button>
              </div>
            )}
            
            <div className="choices">
              {selectedGameData.choices.map((choice, index) => (
                <button 
                  key={index} 
                  onClick={() => handleAnswer(index)}
                  disabled={answerStatus !== null}
                >
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
