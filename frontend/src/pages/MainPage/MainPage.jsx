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
      <section className="grid-section">
        <div className="grid-container">
          <div
            className="grid-box box-large"
            onClick={() => handleClick("/word")}
          >
            단어 학습
          </div>
          <div
            className="grid-box box-normal"
            onClick={() => handleClick("/game")}
          >
            게임
          </div>
          <div
            className="grid-box box-normal"
            onClick={() => handleClick("/report")}
          >
            리포트
          </div>
          <div
            className="grid-box box-normal"
            onClick={() => handleClick("/sentence")}
          >
            문장 학습
          </div>
          <div
            className="grid-box box-normal"
            onClick={() => handleClick("/grammer")}
          >
            문법 연습
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
