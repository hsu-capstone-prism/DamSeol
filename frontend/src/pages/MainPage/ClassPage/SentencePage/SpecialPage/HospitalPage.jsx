import React from "react";
import Layout from "../../../Layout";
import "../../../../../styles/Sentence_Detail.css";

const HospitalPage = () => {
  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>병원에서의 대화</h2>
          <div className="sentence-box-container">
            <div className="sentence-box">01. 진료 예약</div>
            <div className="sentence-box">02. 증상 설명</div>
            <div className="sentence-box">03. 의사의 질문에 답변</div>
            <div className="sentence-box">04. 처방전 관련 대화</div>
            <div className="sentence-box">05. 약 복용 방법 문의</div>
            <div className="sentence-box">06. 검사 관련 설명</div>
            <div className="sentence-box">07. 병원 비용 문의</div>
            <div className="sentence-box">08. 간호사와의 대화</div>
            <div className="sentence-box">09. 퇴원 관련 설명</div>
            <div className="sentence-box">10. 건강 상담</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HospitalPage;
