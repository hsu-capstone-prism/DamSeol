import React from "react";
import Layout from "../../../Layout";
import "../../../../../styles/Sentence_Detail.css";

const TripPage = () => {
  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>여행 중 대화</h2>
          <div className="sentence-box-container">
            <div className="sentence-box">01. 호텔 체크인</div>
            <div className="sentence-box">02. 관광지 안내 요청</div>
            <div className="sentence-box">03. 길 찾기</div>
            <div className="sentence-box">04. 현지 음식 주문</div>
            <div className="sentence-box">05. 교통수단 이용</div>
            <div className="sentence-box">06. 사진 찍어달라고 요청</div>
            <div className="sentence-box">07. 여행 일정 문의</div>
            <div className="sentence-box">08. 현지인과의 친근한 대화</div>
            <div className="sentence-box">09. 긴급 상황 대처</div>
            <div className="sentence-box">10. 여행 후기 공유</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default TripPage;
