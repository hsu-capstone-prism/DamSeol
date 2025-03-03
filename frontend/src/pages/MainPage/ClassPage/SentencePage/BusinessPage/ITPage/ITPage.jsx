import React from "react";
import Layout from "../../../../Layout";
import "../../../../../../styles/Sentence_Detail.css";

const ITPage = () => {
  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>IT 개발자들끼리의 대화</h2>
          <div className="sentence-box-container">
            <div className="sentence-box">01. 코드 리뷰 관련 대화</div>
            <div className="sentence-box">02. 버그 수정 협의</div>
            <div className="sentence-box">03. 개발 일정 논의</div>
            <div className="sentence-box">04. 기술 스택 선택</div>
            <div className="sentence-box">05. 테스트 관련 대화</div>
            <div className="sentence-box">06. 협업 도구 사용법</div>
            <div className="sentence-box">07. 데이터베이스 설계 논의</div>
            <div className="sentence-box">08. API 통합 관련 대화</div>
            <div className="sentence-box">09. 보안 문제 논의</div>
            <div className="sentence-box">10. 새로운 기술 도입 논의</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ITPage;
