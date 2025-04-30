import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MainPage.css";
import wordImg from "../../assets/images/word.png";
import sentenceImg from "../../assets/images/sentence.png";
import grammerImg from "../../assets/images/grammer.png";

const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <main className="main">
      <section className="class-section">
        <h2>My Class</h2>
        <div className="class-container">
          <div className="class-box" onClick={() => handleClick("/word")}>
            <img
              src={wordImg}
              alt="단어 학습"
              style={{ width: "100%", height: "120%", objectFit: "contain" }}
            />
          </div>
          <div className="class-box" onClick={() => handleClick("/sentence")}>
            <img
              src={sentenceImg}
              alt="문장 학습"
              style={{ width: "100%", height: "120%", objectFit: "contain" }}
            />
          </div>
          <div className="class-box" onClick={() => handleClick("/grammer")}>
            <img
              src={grammerImg}
              alt="문법 연습"
              style={{ width: "100%", height: "120%", objectFit: "contain" }}
            />
          </div>
        </div>
      </section>
      <section className="report-game-section">
        <div className="report-box-container">
          <h2>Report</h2>
          <div className="report-box" onClick={() => handleClick("/report")}>
            {/* 리포트 내용이 들어갈 수 있습니다 */}
          </div>
        </div>
        <div className="game-box-container">
          <h2>Game</h2>
          <div className="game-box" onClick={() => handleClick("/game")}>
            {/* 게임 콘텐츠 또는 설명 */}
            <p>게임을 시작해보세요!</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
