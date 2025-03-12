import React, { useState, useEffect } from "react";
import Layout from "../../../Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../../../styles/ConsonantPage.css";

const consonants = [
  { symbol: "ㄱ", key: "G" },
  { symbol: "ㄴ", key: "N" },
  { symbol: "ㄷ", key: "D" },
  { symbol: "ㄹ", key: "R" },
  { symbol: "ㅁ", key: "M" },
  { symbol: "ㅂ", key: "B" },
  { symbol: "ㅅ", key: "S" },
  { symbol: "ㅇ", key: "O" },
  { symbol: "ㅈ", key: "J" },
  { symbol: "ㅊ", key: "CH" },
  { symbol: "ㅋ", key: "K" },
  { symbol: "ㅌ", key: "T" },
  { symbol: "ㅍ", key: "P" },
  { symbol: "ㅎ", key: "H" },
];

// JWT 토큰 가져오기 함수
const getAuthToken = () => localStorage.getItem("authToken");

const ConsonantPage = () => {
  const [subcategoryMap, setSubcategoryMap] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          setError("인증이 필요합니다. 로그인 후 다시 시도하세요.");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        // 서브카테고리 목록 가져오기
        const response = await axios.get(
          "http://localhost:8080/api/subcategories",
          { headers }
        );

        console.log("Component - Subcategory List:", response.data);

        // 자음 목록과 서브카테고리를 매핑
        const consonantCategories = response.data.filter(
          (cat) =>
            consonants.some((con) => con.key === cat.name) &&
            cat.categoryName === "Phon"
        );

        // { "ㄱ": 9, "ㄴ": 10, ... } 형태의 객체 생성
        const map = consonantCategories.reduce((acc, cat) => {
          const consonantSymbol = consonants.find(
            (con) => con.key === cat.name
          )?.symbol;
          if (consonantSymbol) acc[consonantSymbol] = cat.id;
          return acc;
        }, {});

        setSubcategoryMap(map);
      } catch (error) {
        console.error("🚨 Error fetching subcategories:", error);
        setError("서브카테고리 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchSubcategories();
  }, []);

  return (
    <Layout>
      <div className="consonant">
        <section className="consonant-section">
          <h2>자음 목록</h2>
          {error && <p className="error-message">❌ {error}</p>}
          <div className="consonant-box-container">
            {consonants.map((consonant) =>
              subcategoryMap[consonant.symbol] ? (
                <Link
                  to={`/phon/consonant/words/${
                    subcategoryMap[consonant.symbol]
                  }`}
                  key={consonant.symbol}
                  state={{ symbol: consonant.symbol }} // symbol을 state로 전달
                >
                  <div className="consonant-box">{consonant.symbol} 단어</div>
                </Link>
              ) : (
                <div className="consonant-box disabled" key={consonant.symbol}>
                  {consonant.symbol}
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ConsonantPage;
