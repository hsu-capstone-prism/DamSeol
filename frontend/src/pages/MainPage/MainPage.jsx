import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MainPage.css";
import wordImg from "../../assets/images/word.png";
import sentenceImg from "../../assets/images/sentence.png";
import grammerImg from "../../assets/images/grammer.png";
import gameImg from "../../assets/images/game.png";
import reportImg from "../../assets/images/report.png";
import splashImg from "../../assets/images/main-splash.png";

const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <main className="main">
      <section className="main-section">
        <div className="main-row">
          <div className="main-hero">
            <div className="main-hero-date">{dateString}</div>
            <div className="main-hero-title">
              만나서 반가워요, <span className="main-hero-title-username">{localStorage.getItem("username")}님</span>
              <br />
              <span className="main-hero-title-text">더 자연스러운 소통을 위한 매일 쌓아가는 한 걸음</span>
            </div>
            <img
              className="main-hero-img"
              src={splashImg}
              alt="hero"
            />
            
          </div>
        </div>
        <div className="main-row">
          <div className="main-box" onClick={() => handleClick("/word")}>
            <img
              src={wordImg}
              alt="단어 학습"
            />
            <div className="main-box-text-container">
              <div className="main-box-text-background">단어 학습</div>
              <p className="main-box-text">단어 학습</p>
            </div>
          </div>
          <div className="main-box" onClick={() => handleClick("/sentence")}>
            <img
              src={sentenceImg}
              alt="문장 학습"
            />
            <div className="main-box-text-container">
              <div className="main-box-text-background">문장 학습</div>
              <p className="main-box-text">문장 학습</p>
            </div>
          </div>
          <div className="main-box" onClick={() => handleClick("/grammer")}>
            <img
              src={grammerImg}
              alt="문법 연습"
            />
            <div className="main-box-text-container">
              <div className="main-box-text-background">문법 연습</div>
              <p className="main-box-text">문법 연습</p>
            </div>
          </div>
        </div>
        <div className="main-row">
          <div className="main-box double-width main-box-report" onClick={() => handleClick("/report")}>
            <img
              src={reportImg}
              alt="리포트"
            />
            <div className="main-box-text-container">
              <div className="main-box-text-background">리포트</div>
              <p className="main-box-text">리포트</p>
            </div>
          </div>
          <div className="main-box" onClick={() => handleClick("/game")}>
            <img
              src={gameImg}
              alt="문법 연습"
            />
            <div className="main-box-text-container">
              <div className="main-box-text-background">게임을 시작해보세요!</div>
              <p className="main-box-text">게임을 시작해보세요!</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
