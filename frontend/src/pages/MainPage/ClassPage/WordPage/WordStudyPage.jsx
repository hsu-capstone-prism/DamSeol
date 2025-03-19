import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import { useParams, useLocation } from "react-router-dom";
import "../../../../styles/WordStudyPage.css";
import MicButton from "../../../../components/WordMicButton";
import ProgressBar from "../../../../components/WordProgressBar";
import axios from "axios";

const getAuthToken = () => localStorage.getItem("authToken");

const WordStudy = () => {
  const { subcategoryId } = useParams();
  const [words, setWords] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [showFinalResult, setShowFinalResult] = useState(false);

  const location = useLocation();
  const symbol = location.state?.symbol || "알 수 없음";

  useEffect(() => {
    if (!subcategoryId) return;

    const fetchWords = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAuthToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const wordsRes = await axios.get(
          `http://localhost:8080/api/words/subcategory/${subcategoryId}`,
          { headers }
        );

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

  const handleUploadComplete = (data) => {
    setResult(data);
    setIsResultVisible(true);
  };

  if (loading) return <p>📡 데이터 로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="word-study">
        <nav className="breadcrumb">
          <span>단어 학습</span> ➝ <span className="highlight">{symbol}</span>
        </nav>

        <section className="word-display">
          {showFinalResult ? (
            <div className="final-result">
              <h2>최종 결과</h2>
              <p>{result.details}</p>
              <button
                onClick={() => {
                  setShowFinalResult(false);
                  setSelectedIndex(0);
                  setIsResultVisible(false);
                }}
                className="popup-close-btn"
              >
                다시 학습하기
              </button>
            </div>
          ) : (
            <>
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

              {isResultVisible && result && (
                <div className="word-result">
                  <p className="pronunciation-label">000님의 발음</p>
                  <h2 className="user-pronunciation">{result.pron}</h2>

                  <div className="result-bottom-container">
                    <div className="learning-suggestions">
                      <p className="suggestion-title">추천 학습</p>
                      <div className="suggestion-buttons">
                        {result.wrongPhon &&
                          result.wrongPhon.split(",").map((phon, index) => (
                            <button key={index} className="suggestion-btn">
                              {phon}
                            </button>
                          ))}
                      </div>
                    </div>
                    <div className="score-container">
                      <p className="accuracy-label">정확도</p>
                      <p className="score">{result.score}%</p>
                    </div>
                  </div>

                  {/* 마지막 단어에서만 최종 결과화면 보기 버튼 */}
                  {selectedIndex === words.length - 1 && (
                    <button
                      className="final-result-btn"
                      onClick={() => setShowFinalResult(true)}
                    >
                      최종 결과화면 보기
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </section>

        {!isResultVisible && !showFinalResult && (
          <MicButton
            selectedIndex={selectedIndex}
            subcategoryId={subcategoryId}
            totalWords={words.length}
            onUploadComplete={handleUploadComplete}
          />
        )}

        {!showFinalResult && (
          <ProgressBar
            currentStep={selectedIndex}
            totalSteps={words.length}
            onStepClick={(index) => {
              setSelectedIndex(index);
              setIsResultVisible(false);
              setShowFinalResult(false);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default WordStudy;
