import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// 비즈니스 서브카테고리 매칭 리스트 (한글)
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

const BusinessPage = () => {
  const [subcategoryMap, setSubcategoryMap] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const businessName = location.state?.businessName || null;

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

        console.log(" Business - Subcategory List:", response.data);

        // Business 카테고리의 서브카테고리 필터링
        const businessCategories = response.data.filter(
          (cat) =>
            businessTopics.some((b) => b.key === cat.name) &&
            cat.categoryName === "Business"
        );

        // { "IT 개발자": 47, "마케팅 업무": 48, "영업 업무": 49, ... } 형태의 객체 생성
        const map = businessCategories.reduce((acc, cat) => {
          const businessTopic = businessTopics.find(
            (b) => b.key === cat.name
          )?.name;
          if (businessTopic) acc[businessTopic] = cat.id;
          return acc;
        }, {});

        setSubcategoryMap(map);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (businessName && subcategoryMap[businessName]) {
      navigate(`/sentence/study/${subcategoryMap[businessName]}`, {
        replace: true,
        state: { categoryName: businessName }, // "IT 개발자" 등 전달
      });
    }
  }, [businessName, subcategoryMap, navigate]);
};

export default BusinessPage;
