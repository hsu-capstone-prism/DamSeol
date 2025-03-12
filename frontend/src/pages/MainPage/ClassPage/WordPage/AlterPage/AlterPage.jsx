import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const alterTopics = [
  { name: "모음조화", key: "VowelHarmony" },
  { name: "축약과 탈락", key: "ContractionAndElision" },
  { name: "자음동화", key: "ConsonantAssimilation" },
  { name: "경음화와 유성음화", key: "GlottalizationAndSonorization" },
  { name: "격음화", key: "Glottalization" },
  { name: "구개음화", key: "Palatalization" },
];

// JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

const AlterPage = () => {
  const [subcategoryMap, setSubcategoryMap] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const alterName = location.state?.alterName || null;

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

        console.log("Alter - Subcategory List:", response.data);

        // Alter 카테고리의 서브카테고리 필터링
        const alterCategories = response.data.filter(
          (cat) =>
            alterTopics.some((a) => a.key === cat.name) &&
            cat.categoryName === "Alter"
        );

        // { "모음조화": 26, "축약과 탈락": 27, "자음동화": 28, ... } 형태의 객체 생성
        const map = alterCategories.reduce((acc, cat) => {
          const alterTopic = alterTopics.find((a) => a.key === cat.name)?.name;
          if (alterTopic) acc[alterTopic] = cat.id;
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
    if (alterName && subcategoryMap[alterName]) {
      navigate(`/alter/study/words/${subcategoryMap[alterName]}`, {
        replace: true,
        state: { symbol: alterName }, // "모음조화" 등 전달
      });
    }
  }, [alterName, subcategoryMap, navigate]);

  return null;
};

export default AlterPage;
