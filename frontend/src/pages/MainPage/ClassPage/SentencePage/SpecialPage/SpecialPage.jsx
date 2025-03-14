import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// 특별한 상황 서브카테고리 매칭 리스트 (한글)
const specialTopics = [
  { name: "교회에서 대화", key: "Church" },
  { name: "식당에서 주문", key: "RestaurantOrdering" },
  { name: "병원에서 대화", key: "Hospital" },
  { name: "공항에서 대화", key: "Airport" },
  { name: "쇼핑할 때의 대화", key: "Shopping" },
  { name: "여행 중 대화", key: "Travel" },
  { name: "대중교통 이용시 대화", key: "TransportUsage" },
];

// JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

const SpecialPage = () => {
  const [subcategoryMap, setSubcategoryMap] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const specialName = location.state?.specialName || null;

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          console.error("인증이 필요합니다. 로그인 후 다시 시도하세요.");
          return;
        }
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get(
          "http://localhost:8080/api/subcategories",
          { headers }
        );

        console.log("Special - Subcategory List:", response.data);

        // Special 카테고리의 서브카테고리 필터링
        const specialCategories = response.data.filter(
          (cat) =>
            specialTopics.some((s) => s.key === cat.name) &&
            cat.categoryName === "Special"
        );

        // { "교회에서 대화": 40, "식당에서 주문": 41, "병원에서 대화": 42, ... } 형태의 객체 생성
        const map = specialCategories.reduce((acc, cat) => {
          const specialTopic = specialTopics.find(
            (s) => s.key === cat.name
          )?.name;
          if (specialTopic) acc[specialTopic] = cat.id;
          return acc;
        }, {});

        setSubcategoryMap(map);
      } catch (error) {
        console.error("🚨 Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (specialName && subcategoryMap[specialName]) {
      navigate(`/sentence/study/${subcategoryMap[specialName]}`, {
        replace: true,
        state: { categoryName: specialName }, // "교회에서 대화" 등 전달
      });
    }
  }, [specialName, subcategoryMap, navigate]);
};

export default SpecialPage;
