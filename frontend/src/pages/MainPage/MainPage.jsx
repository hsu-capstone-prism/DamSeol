import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MainPage.css";

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
          <div className="class-box" onClick={() => handleClick("/classA")}>
            A
          </div>
          <div className="class-box" onClick={() => handleClick("/classB")}>
            B
          </div>
          <div className="class-box" onClick={() => handleClick("/classC")}>
            C
          </div>
        </div>
      </section>
      <section className="report-section">
        <h3> 학습 보고서 </h3>
        <div className="report-container">
          <div className="report-box">
            <span></span>
          </div>
        </div>
      </section>
      <section className="score-section">
        <h3>점수</h3>
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
