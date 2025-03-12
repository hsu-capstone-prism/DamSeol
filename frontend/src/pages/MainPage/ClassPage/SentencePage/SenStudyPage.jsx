import { useState, useEffect } from "react";
import Layout from "../../Layout";
import { useParams, useLocation } from "react-router-dom";
import "../../../../styles/StudyPage.css";
import MicButton from "../../../../components/MicButton";
import ProgressBar from "../../../../components/ProgressBar";
import axios from "axios";

// JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

const SenStudyPage = () => {
  const { subcategoryId } = useParams();
  const [sentences, setSentences] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const categoryName = location.state?.symbol || "알 수 없음"; // 📌 선택한 카테고리 이름

  // 📌 문장 목록 가져오기
  useEffect(() => {
    if (!subcategoryId) return;

    const fetchSentences = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAuthToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        console.log("📌 문장 데이터 요청:", `/api/sentences/${subcategoryId}`);

        const response = await axios.get(
          `http://localhost:8080/api/sentences/${subcategoryId}`,
          { headers }
        );

        console.log("📌 문장 응답:", response.data);

        if (response.data.length === 0) {
          setError("해당 서브카테고리에 대한 문장이 없습니다.");
        } else {
          setSentences(response.data);
          setSelectedIndex(0);
        }
      } catch (err) {
        console.error("🚨 Error fetching sentences:", err);
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
      <div className="sentence-study">
        <nav className="breadcrumb">
          <span>문장 학습</span> ➝{" "}
          <span className="highlight">{categoryName}</span>
        </nav>
        <section className="sentence-display">
          {sentences.length > 0 ? (
            <>
              <h1 className="sentence">{sentences[selectedIndex].text}</h1>
              <p className="sentence-translation">
                [{sentences[selectedIndex].translation}]
              </p>
            </>
          ) : (
            <p>해당하는 문장이 없습니다.</p>
          )}
        </section>
        <MicButton />
        <ProgressBar
          currentStep={selectedIndex}
          totalSteps={sentences.length}
          onStepClick={(index) => setSelectedIndex(index)}
        />
      </div>
    </Layout>
  );
};

export default SenStudyPage;
