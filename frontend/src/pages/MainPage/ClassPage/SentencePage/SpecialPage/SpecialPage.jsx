import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../../Layout";
import axios from "axios";
import "../../../../../styles/Sentence_Detail.css";

const SpecialPage = () => {
  const location = useLocation();
  const subcategoryId = location.state?.subcategoryId || null;
  const [sentences, setSentences] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSentences = async () => {
      try {
        if (!subcategoryId) {
          setError("올바른 카테고리를 선택하세요.");
          return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("로그인이 필요합니다.");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `http://localhost:8080/api/sentences/${subcategoryId}`,
          { headers }
        );

        console.log("📌 Special Sentences:", response.data);
        setSentences(response.data);
      } catch (error) {
        console.error("🚨 Error fetching sentences:", error);
        setError("문장 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchSentences();
  }, [subcategoryId]);

  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>특별한 상황 문장 학습</h2>
          {error && <p className="error-message">❌ {error}</p>}
          <div className="sentence-box-container">
            {sentences.length > 0
              ? sentences.map((sentence, index) => (
                  <div key={index} className="sentence-box">
                    {`${index + 1}. ${sentence.text}`}
                  </div>
                ))
              : !error && <p className="empty-message">문장이 없습니다.</p>}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SpecialPage;
