import React, { useState } from "react";
import "../../../styles/GamePage.css";
import gameData from "./GameData";
import GameVideo from "../../../components/GameVideo";

const GameScene = () => {

  const [index, setIndex] = useState(1);

  const [selectedGameData, setSelectedGameData] = useState(gameData[index]);
  const [currentIndex, setCurrentIndex] = useState(index);


  const handleAnswer = (choiceIndex) => {
    if (choiceIndex === selectedGameData.answer) {
      alert("정답입니다.");
    } else {
      alert("오답입니다.");
    }
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
            <div className="choices">
              {selectedGameData.choices.map((choice, index) => (
                <button key={index} onClick={() => handleAnswer(index)}>
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
