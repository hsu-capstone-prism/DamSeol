import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import "../../../styles/SentencePage.css";

const SentencePage = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <Layout>
      <div className="sentence-page">
        <h1 className="section-title">문장 학습</h1>

        <section className="learning-section">
          <h2>특별한 상황</h2>
          <div className="box-container">
            <div
              className="box"
              onClick={() => handleClick("/sentence/church")}
            >
              교회에서 대화
            </div>
            <div
              className="box"
              onClick={() => handleClick("/sentence/restaurant")}
            >
              식당에서 주문
            </div>
            <div
              className="box"
              onClick={() => handleClick("/sentence/hospital")}
            >
              병원에서 대화
            </div>
            <div
              className="box"
              onClick={() => handleClick("/sentence/airport")}
            >
              공항에서 대화
            </div>
            <div
              className="box"
              onClick={() => handleClick("/sentence/shopping")}
            >
              쇼핑할 때의 대화
            </div>
            <div className="box" onClick={() => handleClick("/sentence/trip")}>
              여행 중 대화
            </div>
            <div
              className="box"
              onClick={() => handleClick("/sentence/transport")}
            >
              대중교통 이용시 대화
            </div>
            <div className="box">..</div>
          </div>
        </section>
        <section className="learning-section">
          <h2>비즈니스</h2>
          <div className="box-container">
            <div className="box" onClick={() => handleClick("/sentence/IT")}>
              IT 개발자
            </div>
            <div
              className="box"
              onClick={() => handleClick("/sentence/marketing")}
            >
              마케팅 업무
            </div>
            <div className="box" onClick={() => handleClick("/sentence/sales")}>
              영업 업무
            </div>
            <div className="box" onClick={() => handleClick("/sentence/HR")}>
              HR 업무
            </div>
            <div
              className="box"
              onClick={() => handleClick("/sentence/design")}
            >
              디자인 업무
            </div>
            <div
              className="box"
              onClick={() => handleClick("/sentence/research")}
            >
              연구 개발
            </div>
            <div className="box">..</div>
            <div className="box">..</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SentencePage;
