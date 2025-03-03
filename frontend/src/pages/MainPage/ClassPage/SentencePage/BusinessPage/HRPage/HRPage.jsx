import React from "react";
import Layout from "../../../../Layout";
import "../../../../../../styles/Sentence_Detail.css";

const HRPage = () => {
  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>HR 업무 대화</h2>
          <div className="sentence-box-container">
            <div className="sentence-box">01. 채용 공고 논의</div>
            <div className="sentence-box">02. 면접 진행</div>
            <div className="sentence-box">03. 신입 사원 오리엔테이션</div>
            <div className="sentence-box">04. 직원 평가</div>
            <div className="sentence-box">05. 교욱 프로그램 기획</div>
            <div className="sentence-box">06. 휴가 및 복지 정책 논의</div>
            <div className="sentence-box">07. 직원 상담</div>
            <div className="sentence-box">08. 조직 문화 개선 논의</div>
            <div className="sentence-box">09. 퇴사 면담</div>
            <div className="sentence-box">10. HR 보고서 작성</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HRPage;
