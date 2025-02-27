import React from "react";
import Layout from "../../../Layout";
import "../../../../../styles/Sentence_Detail.css";

const MarketingPage = () => {
  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>마케팅 업무 대화</h2>
          <div className="sentence-box-container">
            <div className="sentence-box">01. 캠페인 기획</div>
            <div className="sentence-box">02. 타겟 설정 논의</div>
            <div className="sentence-box">03. 광고 예산 논의</div>
            <div className="sentence-box">04. SMS/이메일 마케팅</div>
            <div className="sentence-box">05. 콘텐츠 제작 협의</div>
            <div className="sentence-box">06. 데이터 분석 결과 공유</div>
            <div className="sentence-box">07. 경쟁사 분석 논의</div>
            <div className="sentence-box">08. 고객 피드백 반영</div>
            <div className="sentence-box">09. 성과 보고</div>
            <div className="sentence-box">10. 팀 내부 브레인스토밍</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default MarketingPage;
