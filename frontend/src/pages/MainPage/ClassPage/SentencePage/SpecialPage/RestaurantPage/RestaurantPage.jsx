import React from "react";
import Layout from "../../../../Layout";
import "../../../../../../styles/Sentence_Detail.css";

const RestaurantPage = () => {
  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>식당에서 주문</h2>
          <div className="sentence-box-container">
            <div className="sentence-box">01. 메뉴 확인 및 주문</div>
            <div className="sentence-box">02. 주문하기</div>
            <div className="sentence-box">03. 음식 맞춤 설정 요청</div>
            <div className="sentence-box">04. 음료 주문</div>
            <div className="sentence-box">05. 계산 요청</div>
            <div className="sentence-box">06. 음식 맛 평가</div>
            <div className="sentence-box">07. 불만 사항 전달</div>
            <div className="sentence-box">08. 추천 메뉴 질문</div>
            <div className="sentence-box">09. 식사 후 감사 표현</div>
            <div className="sentence-box">10. 직원과의 간단한 대화</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RestaurantPage;
