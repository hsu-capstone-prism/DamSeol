import React from "react";
import Layout from "../Layout";
import "../../../styles/GrammerPage.css";

const GrammerPage = () => {
  return (
    <Layout>
      <div className="grammer-page">
        <h1 className="section-title">문법 연습</h1>
        <section className="grammer-learning-section">
          <div className="box-container">
            <div className="box">기본 문장 구조</div>
            <div className="box">문장 내 모음 발음</div>
            <div className="box">문장 내 자음 발음</div>
            <div className="box">문장 내 음운 변동</div>
            <div className="box">사잇소리 현상</div>
            <div className="box">문장 내 불규칙 활용</div>
            <div className="box">..</div>
            <div className="box">..</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default GrammerPage;
