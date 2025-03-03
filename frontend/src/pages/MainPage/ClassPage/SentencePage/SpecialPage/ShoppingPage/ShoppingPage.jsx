import React from "react";
import Layout from "../../../../Layout";
import "../../../../../../styles/Sentence_Detail.css";

const ShoppingPage = () => {
  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>쇼핑할 때의 대화</h2>
          <div className="sentence-box-container">
            <div className="sentence-box">01. 상품 찾기</div>
            <div className="sentence-box">02. 가격 문의</div>
            <div className="sentence-box">03. 사이즈 및 색상 변경 요청</div>
            <div className="sentence-box">04. 할인 및 이벤트 질문</div>
            <div className="sentence-box">05. 계산 방법 문의</div>
            <div className="sentence-box">06. 환불 및 교환 요청</div>
            <div className="sentence-box">07. 직원과의 친절한 대화</div>
            <div className="sentence-box">08. 상품 추천 요청</div>
            <div className="sentence-box">09. 포장 관련 요청</div>
            <div className="sentence-box">10. 쇼핑 후 감사 표현</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ShoppingPage;
