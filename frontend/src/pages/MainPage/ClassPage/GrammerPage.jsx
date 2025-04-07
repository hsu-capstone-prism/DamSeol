import React from "react";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import "../../../styles/GrammerPage.css";

const GrammerPage = () => {
  const navigate = useNavigate();

  // 문법 서브카테고리 id와 이름 매핑
  const categories = [
    { name: "기본 문장 구조", id: 34, symbol: "기본 문장 구조" },
    { name: "문장 내 모음 발음", id: 35, symbol: "모음 발음" },
    { name: "문장 내 자음 발음", id: 36, symbol: "자음 발음" },
    { name: "문장 내 음운 변동", id: 37, symbol: "음운 변동" },
    { name: "사잇소리 현상", id: 38, symbol: "사잇소리" },
    { name: "문장 내 불규칙 활용", id: 39, symbol: "불규칙 활용" },
  ];

  const handleClick = (subcategoryId, symbol) => {
    navigate(`/grammer/study/${subcategoryId}`, { state: { symbol } });
  };

  return (
    <Layout>
      <div className="grammer-page">
        <h1 className="section-title">문법 연습</h1>
        <section className="grammer-learning-section">
          <div className="grammer-box-container">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="grammer-box"
                onClick={() => handleClick(cat.id, cat.symbol)}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default GrammerPage;
