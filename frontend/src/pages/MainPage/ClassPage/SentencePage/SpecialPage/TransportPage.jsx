import React from "react";
import Layout from "../../../Layout";
import "../../../../../styles/Sentence_Detail.css";

const TransportPage = () => {
  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>대중교통 이용</h2>
          <div className="sentence-box-container">
            <div className="sentence-box">01. 버스 정류장에서</div>
            <div className="sentence-box">02. 지하철 노선 문의</div>
            <div className="sentence-box">03. 티켓 구매</div>
            <div className="sentence-box">04. 승차 및 하차 안내</div>
            <div className="sentence-box">05. 환승 관련 질문</div>
            <div className="sentence-box">06. 교통카드 충전</div>
            <div className="sentence-box">07. 길을 잃었을 때</div>
            <div className="sentence-box">08. 운전기사와의 대화</div>
            <div className="sentence-box">09. 교통 상황 문의</div>
            <div className="sentence-box">10. 대중교통 예절</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default TransportPage;
