import React from "react";
import Layout from "../../../Layout";
import "../../../../../styles/Sentence_Detail.css";

const SalesPage = () => {
  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>영업 업무 대화</h2>
          <div className="sentence-box-container">
            <div className="sentence-box">01. 고객 미팅 준비</div>
            <div className="sentence-box">02. 제품 설명</div>
            <div className="sentence-box">03. 계약 조건 협상</div>
            <div className="sentence-box">04. 고객 요구 사항 논의</div>
            <div className="sentence-box">05. 영업 목표 설정</div>
            <div className="sentence-box">06. 거래처 관리</div>
            <div className="sentence-box">07. 영업 성과 보고</div>
            <div className="sentence-box">08. 고객 불만 처리</div>
            <div className="sentence-box">09. 영업 전략 논의</div>
            <div className="sentence-box">10. 팀 내부 회의</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SalesPage;
