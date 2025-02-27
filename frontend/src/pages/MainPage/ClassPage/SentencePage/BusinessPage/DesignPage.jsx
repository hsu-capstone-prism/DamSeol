import React from "react";
import Layout from "../../../Layout";
import "../../../../../styles/Sentence_Detail.css";

const DesignPage = () => {
  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>디자인 업무 대화</h2>
          <div className="sentence-box-container">
            <div className="sentence-box">01. 디자인 컨셉 논의</div>
            <div className="sentence-box">02. 클라이언트 피드백 반영</div>
            <div className="sentence-box">03. 디자인 툴 사용법 공유</div>
            <div className="sentence-box">04. 프로토타입 검토</div>
            <div className="sentence-box">05. 색상 및 폰트 선택</div>
            <div className="sentence-box">06. 디자인 일정 논의</div>
            <div className="sentence-box">07. 협업 플랫폼 사용법</div>
            <div className="sentence-box">08. 디자인 트렌드 논의</div>
            <div className="sentence-box">09. 디자인 팀 내부 회의</div>
            <div className="sentence-box">10. 최종 디자인 승인</div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DesignPage;
