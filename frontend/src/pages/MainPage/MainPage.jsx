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
      <section className="main-section">
        <div className="main-hero">
          <div className="main-hero-title">
            환영합니다, {localStorage.getItem("username")} 님
          </div>
        </div>
        <div className="main-row">
          <div className="main-box" onClick={() => handleClick("/word")}>
            <img
              src={wordImg}
              alt="단어 학습"
            />
            <div className="main-box-text-container">
              <div className="main-box-text-background"></div>
              <p className="main-box-text">단어 학습</p>
            </div>
          </div>
          <div className="main-box" onClick={() => handleClick("/sentence")}>
            <img
              src={sentenceImg}
              alt="문장 학습"
            />
            <div className="main-box-text-container">
              <div className="main-box-text-background"></div>
              <p className="main-box-text">문장 학습</p>
            </div>
          </div>
          <div className="main-box" onClick={() => handleClick("/grammer")}>
            <img
              src={grammerImg}
              alt="문법 연습"
            />
            <div className="main-box-text-container">
              <div className="main-box-text-background"></div>
              <p className="main-box-text">문법 연습</p>
            </div>
          </div>
        </div>
        <div className="main-row">
          <div className="main-box double-width" onClick={() => handleClick("/report")}>
            {/* 리포트 내용이 들어갈 수 있습니다 */}
            <div className="main-box-text-container">
              <div className="main-box-text-background"></div>
              <p className="main-box-text">리포트</p>
            </div>
          </div>
          <div className="main-box" onClick={() => handleClick("/game")}>
            {/* 게임 콘텐츠 또는 설명 */}
            <div className="main-box-text-container">
              <div className="main-box-text-background"></div>
              <p className="main-box-text">게임을 시작해보세요!</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
