import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import { useParams, useLocation } from "react-router-dom";
import "../../../../styles/SenStudyPage.css";
import MicButton from "../../../../components/SenMicButton";
import ProgressBar from "../../../../components/SenProgressBar";

// axios 제거 (사용 안 하므로)
const getAuthToken = () => localStorage.getItem("authToken");

const getRandomSentences = (arr, count) => {
  if (arr.length <= count) return arr;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const SenStudyPage = () => {
  const { subcategoryId } = useParams();
  const [sentences, setSentences] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadResultList, setUploadResultList] = useState([]);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const location = useLocation();
  const symbol = location.state?.symbol || "알 수 없음";
  const username = localStorage.getItem("username") || "사용자";

  useEffect(() => {
    if (!subcategoryId) return;

    const fetchSentences = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAuthToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await fetch(
          `http://localhost:8080/api/sentences/subcategory/${subcategoryId}`,
          { headers }
        );

        const data = await response.json();

        if (data.length === 0) {
          setError("해당 서브카테고리에 대한 문장이 없습니다.");
        } else {
          const randomSentences = getRandomSentences(data, 5);
          setSentences(randomSentences);
          setSelectedIndex(0);
          setUploadResultList(new Array(randomSentences.length).fill(null));
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

  const handleUploadComplete = (data) => {
    setUploadResultList((prev) => {
      const updated = [...prev];
      updated[selectedIndex] = data;
      return updated;
    });
    setIsResultVisible(true);
  };

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
            <h1 className="sen">{sentences[selectedIndex].text}</h1>
          ) : (
            <p>해당하는 문장이 없습니다.</p>
          )}

          {isResultVisible && uploadResultList[selectedIndex] && (
            <div className="sen-result">
              <p className="pronunciation-label">{username}님의 발음 결과</p>
              <h2 className="user-pronunciation">
                {uploadResultList[selectedIndex].pron}
              </h2>
              <p className="score-label">정확도</p>
              <p className="score">{uploadResultList[selectedIndex].score}%</p>
              <p className="tip-content">
                {uploadResultList[selectedIndex].details}
              </p>
            </div>
          )}
        </section>

        {!isResultVisible && (
          <MicButton
            selectedIndex={selectedIndex}
            sentences={sentences}
            onUploadComplete={handleUploadComplete}
          />
        )}

        <ProgressBar
          currentStep={selectedIndex}
          totalSteps={sentences.length}
          onStepClick={(index) => {
            setSelectedIndex(index);
            setIsResultVisible(false);
          }}
        />
      </div>
    </Layout>
  );
};

export default SenStudyPage;
