import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout";
import "../../../styles/SentencePage.css";

// 📌 특별한 상황 서브카테고리 (한글)
const specialTopics = [
  { name: "교회에서 대화", key: "Church" },
  { name: "식당에서 주문", key: "RestaurantOrdering" },
  { name: "병원에서 대화", key: "Hospital" },
  { name: "공항에서 대화", key: "Airport" },
  { name: "쇼핑할 때의 대화", key: "Shopping" },
  { name: "여행 중 대화", key: "Travel" },
  { name: "대중교통 이용시 대화", key: "TransportUsage" },
];

// 📌 비즈니스 서브카테고리 (한글)
const businessTopics = [
  { name: "IT 개발자", key: "ITDeveloper" },
  { name: "마케팅 업무", key: "Marketing" },
  { name: "영업 업무", key: "Sales" },
  { name: "HR 업무", key: "HR" },
  { name: "디자인 업무", key: "Design" },
  { name: "연구 개발", key: "Research" },
];

// JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

const SentencePage = () => {
  const navigate = useNavigate();
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

        console.log("📌 Sentence - Subcategory List:", response.data);

        // 서브카테고리 데이터를 categoryName 기준으로 정리
        const map = response.data.reduce((acc, subcat) => {
          const { categoryName, name, id } = subcat;
          if (!acc[categoryName]) {
            acc[categoryName] = {};
          }
          acc[categoryName][name] = id;
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

  const handleClick = (subcategoryId, topicName) => {
    if (subcategoryId) {
      navigate(`/sentence/study/${subcategoryId}`, {
        state: { symbol: topicName }, // 📌 symbol을 state로 전달
      });
    } else {
      alert("데이터가 없습니다.");
    }
  };

  return (
    <Layout>
      <div className="sentence-page">
        <h1 className="section-title">문장 학습</h1>

        {error && <p className="error-message">❌ {error}</p>}

        {/* 📌 특별한 상황 */}
        <section className="sentence-learning-section">
          <h2>특별한 상황</h2>
          <div className="box-container">
            {specialTopics.map((topic) => (
              <div
                key={topic.key}
                className="box"
                onClick={() =>
                  handleClick(
                    subcategoryMap["Special"]?.[topic.key],
                    topic.name
                  )
                }
              >
                {topic.name}
              </div>
            ))}
          </div>
        </section>

        {/* 📌 비즈니스 */}
        <section className="sentence-learning-section">
          <h2>비즈니스</h2>
          <div className="box-container">
            {businessTopics.map((topic) => (
              <div
                key={topic.key}
                className="box"
                onClick={() =>
                  handleClick(
                    subcategoryMap["Business"]?.[topic.key],
                    topic.name
                  )
                }
              >
                {topic.name}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SentencePage;
