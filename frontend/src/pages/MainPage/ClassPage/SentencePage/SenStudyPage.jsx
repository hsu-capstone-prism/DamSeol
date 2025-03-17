import { useState, useEffect } from "react";
import Layout from "../../Layout";
import { useParams, useLocation } from "react-router-dom";
import "../../../../styles/SenStudyPage.css";
import MicButton from "../../../../components/SenMicButton";
import ProgressBar from "../../../../components/SenProgressBar";
import axios from "axios";

// JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

// 배열에서 랜덤하게 5개 선택하는 함수
const getRandomSentences = (arr, count) => {
  if (arr.length <= count) return arr; // 문장이 5개 이하라면 그대로 반환
  const shuffled = [...arr].sort(() => 0.5 - Math.random()); // 랜덤 섞기
  return shuffled.slice(0, count);
};

const SenStudyPage = () => {
  const { subcategoryId } = useParams();
  const [sentences, setSentences] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const symbol = location.state?.symbol || "알 수 없음";

  // 문장 목록 가져오기
  useEffect(() => {
    if (!subcategoryId) return;

    const fetchSentences = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAuthToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        console.log(
          "문장 데이터 요청:",
          `/api/sentences/subcategory/${subcategoryId}`
        );

        const response = await axios.get(
          `http://localhost:8080/api/sentences/subcategory/${subcategoryId}`,
          { headers }
        );

        console.log("문장 응답:", response.data);

        if (response.data.length === 0) {
          setError("해당 서브카테고리에 대한 문장이 없습니다.");
        } else {
          const randomSentences = getRandomSentences(response.data, 5); // 🔹 랜덤으로 5개 선택
          setSentences(randomSentences);
          setSelectedIndex(0);
        }
      } catch (err) {
        console.error("Error fetching sentences:", err);
        setError("문장 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchSentences();
  }, [subcategoryId]);

  if (loading) return <p>📡 데이터 로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="sen-study">
        <nav className="breadcrumb">
          <span>문장 학습</span> ➝ <span className="highlight">{symbol}</span>
        </nav>
        <section className="sen-display">
          {sentences.length > 0 ? (
            <>
              <h1 className="sen">{sentences[selectedIndex].text}</h1>
            </>
          ) : (
            <p>해당하는 문장이 없습니다.</p>
          )}
        </section>
        <MicButton />
        <ProgressBar
          currentStep={selectedIndex}
          totalSteps={sentences.length} // 🔹 5개까지만 표시
          onStepClick={(index) => setSelectedIndex(index)}
        />
      </div>
    </Layout>
  );
};

export default SenStudyPage;
