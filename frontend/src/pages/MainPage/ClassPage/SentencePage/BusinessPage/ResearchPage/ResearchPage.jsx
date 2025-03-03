import React from "react";
import Layout from "../../../../Layout";
import "../../../../../../styles/Sentence_Detail.css";

const ResearchPage = () => {
  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>연구 개발 대화</h2>
          <div className="sentence-box-container">
            <div className="sentence-box">01. 연구 주제 논의</div>
            <div className="sentence-box">02. 실험 설계</div>
            <div className="sentence-box">03. 데이터 분석</div>
            <div className="sentence-box">04. 연구 결과 보고</div>
            <div className="sentence-box">05. 특허 출원 논의</div>
            <div className="sentence-box">06. 연구비 지원 신청</div>
            <div className="sentence-box">07. 팀 내부 브레인스토밍</div>
            <div className="sentence-box">08. 학술 논문 작성</div>
            <div className="sentence-box">09. 연구 발표 준비</div>
            <div className="sentence-box">10. 연구 성과 공유</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ResearchPage;
