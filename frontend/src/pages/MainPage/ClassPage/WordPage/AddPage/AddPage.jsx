import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const addTopics = [
  { name: "ㅅ 첨가", key: "SInsertion" },
  { name: "ㄴ 첨가", key: "NInsertion" },
];

// JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

const AddPage = () => {
  const [subcategoryMap, setSubcategoryMap] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const addName = location.state?.addName || null;

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

        console.log("Add - Subcategory List:", response.data);

        // Add 카테고리의 서브카테고리 필터링
        const addCategories = response.data.filter(
          (cat) =>
            addTopics.some((ad) => ad.key === cat.name) &&
            cat.categoryName === "Add"
        );

        // { "ㅅ 첨가": 32, "ㄴ 첨가": 33 } 형태의 객체 생성
        const map = addCategories.reduce((acc, cat) => {
          const addTopic = addTopics.find((ad) => ad.key === cat.name)?.name;
          if (addTopic) acc[addTopic] = cat.id;
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
    if (addName && subcategoryMap[addName]) {
      navigate(`/add/study/words/${subcategoryMap[addName]}`, {
        replace: true,
        state: { symbol: addName }, // "ㅅ 첨가" 등 전달
      });
    }
  }, [addName, subcategoryMap, navigate]);

  return null;
};

export default AddPage;
