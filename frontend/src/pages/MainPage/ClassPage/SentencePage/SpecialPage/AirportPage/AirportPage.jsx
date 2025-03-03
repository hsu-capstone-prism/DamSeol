import React from "react";
import Layout from "../../../../Layout";
import "../../../../../../styles/Sentence_Detail.css";

const AirportPage = () => {
  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>공항에서의 대화</h2>
          <div className="sentence-box-container">
            <div className="sentence-box">01. 체크인 카운터에서 대화</div>
            <div className="sentence-box">02. 보안 검색 대화</div>
            <div className="sentence-box">03. 탑승 게이트 안내</div>
            <div className="sentence-box">04. 기내 서비스 요청</div>
            <div className="sentence-box">05. 입국 심사 대화</div>
            <div className="sentence-box">06. 짐 찾는 곳에서</div>
            <div className="sentence-box">07. 환전 관련 대화</div>
            <div className="sentence-box">08. 공항 직원과의 대화</div>
            <div className="sentence-box">09. 택시 승차 대화</div>
            <div className="sentence-box">10. 비행기 내 이웃과의 대화</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AirportPage;
