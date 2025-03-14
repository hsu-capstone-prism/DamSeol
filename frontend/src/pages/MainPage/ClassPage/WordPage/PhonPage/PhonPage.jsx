import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const phonTopics = [
  { name: "음절의 끝소리", key: "FinalSound" },
  { name: "유성자음", key: "Voiced" },
  { name: "무성자음", key: "Unvoiced" },
];

// JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

const PhonPage = () => {
  const [subcategoryMap, setSubcategoryMap] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const phonName = location.state?.phonName || null;

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

        console.log("Phon - Subcategory List:", response.data);

        // Phon 카테고리의 서브카테고리 필터링
        const phonCategories = response.data.filter(
          (cat) =>
            phonTopics.some((p) => p.key === cat.name) &&
            cat.categoryName === "Phon"
        );

        // { "음절의 끝소리": 23, "유성자음": 24, "무성자음": 25 } 형태의 객체 생성
        const map = phonCategories.reduce((acc, cat) => {
          const phonName = phonTopics.find((p) => p.key === cat.name)?.name;
          if (phonName) acc[phonName] = cat.id;
          return acc;
        }, {});

        setSubcategoryMap(map);
      } catch (error) {
        console.error(" Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (phonName && subcategoryMap[phonName]) {
      navigate(`/phon/study/words/${subcategoryMap[phonName]}`, {
        replace: true,
        state: { symbol: phonName }, // symbol을 state로 전달
      });
    }
  }, [phonName, subcategoryMap, navigate]);

  return null;
};

export default PhonPage;
