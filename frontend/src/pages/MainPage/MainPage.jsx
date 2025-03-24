import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MainPage.css";
import wordImg from "../../images/word.png";

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
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div className="class-box" onClick={() => handleClick("/sentence")}>
            문장 학습
          </div>
          <div className="class-box" onClick={() => handleClick("/grammer")}>
            문법 연습
          </div>
          <div className="class-box">...</div>
        </div>
      </section>
      <section className="report-section">
        <h2>Report</h2>
        <div
          className="report-box"
          onClick={() => handleClick("/report")}
        ></div>
      </section>
      <section className="score-section">
        <h2>Score</h2>
        <div className="score-table">
          <div className="score-row">
            <span>A</span>
            <div className="score-line"></div>
          </div>
          <div className="score-row">
            <span>B</span>
            <div className="score-line"></div>
          </div>
          <div className="score-row">
            <span>C</span>
            <div className="score-line"></div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
