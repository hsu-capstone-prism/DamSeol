import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import { useParams, useLocation } from "react-router-dom";
import "../../../../styles/WordStudyPage.css";
import MicButton from "../../../../components/WordMicButton";
import ProgressBar from "../../../../components/WordProgressBar";
import axios from "axios";

// JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

const WordStudy = () => {
  const { subcategoryId } = useParams();
  const [words, setWords] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const symbol = location.state?.symbol || "알 수 없음"; // state에서 symbol 가져오기

  // 단어 목록 가져오기
  useEffect(() => {
    if (!subcategoryId) return;

    const fetchWords = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAuthToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        console.log(
          "단어 데이터 요청:",
          `/api/words/subcategory/${subcategoryId}`
        );

        const wordsRes = await axios.get(
          `http://localhost:8080/api/words/subcategory/${subcategoryId}`,
          { headers }
        );

        console.log("단어 응답:", wordsRes.data);

        if (wordsRes.data.length === 0) {
          setError("해당 서브카테고리에 대한 단어가 없습니다.");
        } else {
          setWords(wordsRes.data);
          setSelectedIndex(0);
        }
      } catch (err) {
        console.error("Error fetching words:", err);
        setError("단어 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [subcategoryId]);

  if (loading) return <p>📡 데이터 로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="word-study">
        <nav className="breadcrumb">
          <span>단어 학습</span> ➝ <span className="highlight">{symbol}</span>
        </nav>
        <section className="word-display">
          {words.length > 0 ? (
            <>
              <h1 className="word">{words[selectedIndex].text}</h1>
              <p className="word-pronunciation">
                [{words[selectedIndex].wordPron}]
              </p>
            </>
          ) : (
            <p>해당하는 단어가 없습니다.</p>
          )}
        </section>
        <MicButton
          selectedIndex={selectedIndex}
          subcategoryId={subcategoryId}
          totalWords={words.length}
        />
        <ProgressBar
          currentStep={selectedIndex}
          totalSteps={words.length}
          onStepClick={(index) => setSelectedIndex(index)}
        />
      </div>
    </Layout>
  );
};

export default WordStudy;
