import React from "react";
import Layout from "../../../Layout";
import "../../../../../styles/Sentence_Detail.css";

const ChurchPage = () => {
  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>교회에서의 대화</h2>
          <div className="sentence-box-container">
            <div className="sentence-box">01. 예배 시작 전 인사</div>
            <div className="sentence-box">02. 찬양 중 사용하는 표현</div>
            <div className="sentence-box">03. 기도문 발음 연습</div>
            <div className="sentence-box">04. 설교 중 핵심 문장</div>
            <div className="sentence-box">05. 교회 행사 안내</div>
            <div className="sentence-box">06. 신앙 관련 질문과 답변</div>
            <div className="sentence-box">07. 교회 친구와의 일상 대화</div>
            <div className="sentence-box">08. 봉사 활동 관련 표현</div>
            <div className="sentence-box">09. 성경 구절 발음 연습</div>
            <div className="sentence-box">10. 교회 식사 시간 대화</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ChurchPage;
