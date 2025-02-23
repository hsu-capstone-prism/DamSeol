import React from "react";
import Layout from "../Layout";
import "../../../styles/WordPage.css";

const WordPage = () => {
  return (
    <Layout>
      <div className="word-page">
        <h1 className="section-title">단어 학습</h1>

        <section className="learning-section">
          <h2>음운</h2>
          <div className="box-container">
            <div className="box">모음</div>
            <div className="box">자음</div>
            <div className="box">모음과 자음의 결합</div>
            <div className="box">음절의 끝소리</div>
            <div className="box">유성자음과 무성자음</div>
            <div className="box">..</div>
            <div className="box">..</div>
            <div className="box">..</div>
          </div>
        </section>
        <section className="learning-section">
          <h2>음운 변동</h2>
          <div className="box-container">
            <div className="box">모음조화</div>
            <div className="box">축약과 탈락</div>
            <div className="box">자음동화</div>
            <div className="box">경음화와 유성음화</div>
            <div className="box">격음화</div>
            <div className="box">구개음화</div>
            <div className="box">..</div>
            <div className="box">..</div>
          </div>
        </section>
        <section className="learning-section">
          <h2>사잇소리 현상</h2>
          <div className="box-container">
            <div className="box">ㅅ 첨가</div>
            <div className="box">ㄴ 첨가</div>
            <div className="box">ㅅ과 ㄴ의 첨가</div>
            <div className="box">..</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default WordPage;
