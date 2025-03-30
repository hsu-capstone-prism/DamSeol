import React, { useState, useEffect } from "react";
import Layout from "../../../Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../../../styles/VowelPage.css";

const vowels = [
  { symbol: "ㅣ", key: "I" },
  { symbol: "ㅡ", key: "EU" },
  { symbol: "ㅜ", key: "U" },
  { symbol: "ㅔ", key: "E" },
  { symbol: "ㅓ", key: "EO" },
  { symbol: "ㅗ", key: "O" },
  { symbol: "ㅐ", key: "AE" },
  { symbol: "ㅏ", key: "A" },
];

// JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

const VowelPage = () => {
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

        const response = await axios.get(
          "http://localhost:8080/api/subcategories",
          { headers }
        );

        console.log("Vowel - Subcategory List:", response.data);

        // 모음 목록과 서브카테고리를 매핑
        const vowelCategories = response.data.filter(
          (cat) =>
            vowels.some((v) => v.key === cat.name) &&
            cat.categoryName === "Phon"
        );

        console.log("📂 Filtered Vowel Categories:", vowelCategories);

        // { "ㅣ": 1, "ㅡ": 2, ... } 형태의 객체 생성
        const map = vowelCategories.reduce((acc, cat) => {
          const vowelSymbol = vowels.find((v) => v.key === cat.name)?.symbol;
          if (vowelSymbol) acc[vowelSymbol] = cat.id;
          return acc;
        }, {});

        console.log("📂 Final Vowel Map:", map);
        setSubcategoryMap(map);
      } catch (error) {
        console.error(" Error fetching subcategories:", error);
        setError("서브카테고리 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchSubcategories();
  }, []);

  return (
    <Layout>
      <div className="vowel">
        <section className="vowel-section">
          <h2>모음 목록</h2>
          {error && <p className="error-message">❌ {error}</p>}
          <div className="vowel-box-container">
            {vowels.map((vowel) =>
              subcategoryMap[vowel.symbol] ? (
                <Link
                  to={`/phon/vowel/words/${subcategoryMap[vowel.symbol]}`}
                  key={vowel.symbol}
                  state={{ symbol: vowel.symbol }} // symbol을 state로 전달
                >
                  <div className="vowel-box">{vowel.symbol} 단어</div>
                </Link>
              ) : (
                <div className="vowel-box disabled" key={vowel.symbol}>
                  {vowel.symbol} 단어
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default VowelPage;
