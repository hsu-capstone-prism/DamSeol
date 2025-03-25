import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import { useParams, useLocation } from "react-router-dom";
import "../../../../styles/SenStudyPage.css";
import MicButton from "../../../../components/SenMicButton";
import ProgressBar from "../../../../components/SenProgressBar";
import axios from "axios";

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
  const [resultList, setResultList] = useState([]);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFinalResult, setShowFinalResult] = useState(false);

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

        const response = await axios.get(
          `http://localhost:8080/api/sentences/subcategory/${subcategoryId}`,
          { headers }
        );

        if (response.data.length === 0) {
          setError("해당 서브카테고리에 대한 문장이 없습니다.");
        } else {
          const selected = getRandomSentences(response.data, 5);
          setSentences(selected);
          setSelectedIndex(0);
          setResultList(new Array(selected.length).fill(null));
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

  useEffect(() => {
    if (sentences[selectedIndex]?.id) {
      sessionStorage.setItem("sentenceId", sentences[selectedIndex].id);
    }
  }, [selectedIndex, sentences]);

  const handleUploadComplete = (data) => {
    setResultList((prev) => {
      const updated = [...prev];
      updated[selectedIndex] = data;
      return updated;
    });
    setIsResultVisible(true);
  };

  const getSummaryResult = () => {
    const validResults = resultList.filter(Boolean);
    const totalScore = validResults.reduce((sum, r) => sum + r.score, 0);
    const avgScore = validResults.length
      ? Math.round(totalScore / validResults.length)
      : 0;

    const allWrongPhons = validResults
      .map((r) => r.wrongPhon)
      .filter(Boolean)
      .flatMap((wp) => wp.split(",").map((p) => p.trim()));

    const uniqueWrongPhons = [...new Set(allWrongPhons)];

    const allDetails = validResults.map((r) => r.details).join(" \n");

    return { avgScore, uniqueWrongPhons, allDetails };
  };

  const { avgScore, uniqueWrongPhons, allDetails } = getSummaryResult();

  if (loading) return <p>📡 데이터 로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="sen-study">
        <nav className="breadcrumb">
          <span>문장 학습</span> ➝ <span className="highlight">{symbol}</span>
        </nav>

        <section className="sen-display">
          {showFinalResult ? (
            <div className="final-result">
              <h2>{username}님의 학습 결과</h2>
              <div className="final-result-grid">
                <div className="final-left">
                  <p className="final-title">평균 정확도</p>
                  <div className="accuracy-bar">
                    <div
                      className="accuracy-fill"
                      style={{
                        width: `${avgScore}%`,
                        backgroundColor:
                          avgScore <= 25
                            ? "#E9967A"
                            : avgScore <= 50
                            ? "#EEE8AA"
                            : avgScore <= 75
                            ? "#8FBC8F"
                            : "#6366f1",
                      }}
                    >
                      {avgScore}%
                    </div>
                  </div>
                  <p className="final-title">추천 학습 자·모음</p>
                  <div className="phon-list">
                    {uniqueWrongPhons.map((phon, index) => (
                      <span key={index} className="phon-item">
                        {phon}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="final-right">
                  <p className="final-title">학습 팁</p>
                  <p className="tip-content">{allDetails}</p>
                </div>
              </div>

              <div className="button-group">
                <button
                  className="retry-btn"
                  onClick={() => {
                    setShowFinalResult(false);
                    setSelectedIndex(0);
                    setIsResultVisible(false);
                  }}
                >
                  다시 학습하기
                </button>
                <button
                  className="home-btn"
                  onClick={() => (window.location.href = "/main")}
                >
                  학습 화면으로
                </button>
              </div>
            </div>
          ) : (
            <>
              {sentences.length > 0 ? (
                <>
                  <h1 className="sen">{sentences[selectedIndex].text}</h1>
                </>
              ) : (
                <p>해당하는 문장이 없습니다.</p>
              )}

              {isResultVisible && resultList[selectedIndex] && (
                <div className="sen-result">
                  <p className="pronunciation-label">{username}님의 발음</p>
                  <h2 className="user-pronunciation">
                    {resultList[selectedIndex].pron}
                  </h2>

                  <div className="result-bottom-container">
                    <div className="learning-suggestions">
                      <p className="suggestion-title">추천 학습</p>
                      <div className="suggestion-buttons">
                        {resultList[selectedIndex].wrongPhon &&
                          resultList[selectedIndex].wrongPhon
                            .split(",")
                            .map((phon, index) => (
                              <span key={index} className="phon-item">
                                {phon}
                              </span>
                            ))}
                      </div>
                    </div>
                    <div className="score-container">
                      {selectedIndex === sentences.length - 1 && (
                        <button
                          className="final-result-btn"
                          onClick={() => setShowFinalResult(true)}
                        >
                          최종 결과화면 보기
                        </button>
                      )}
                      <p className="accuracy-label">정확도</p>
                      <p className="score">
                        {resultList[selectedIndex].score}%
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        {!isResultVisible && sentences[selectedIndex]?.id && (
          <MicButton
            selectedIndex={selectedIndex}
            sentenceId={sentences[selectedIndex].id}
            totalWords={sentences.length}
            onUploadComplete={handleUploadComplete}
          />
        )}

        <ProgressBar
          currentStep={selectedIndex}
          totalSteps={sentences.length}
          onStepClick={(index) => {
            setSelectedIndex(index);
            setIsResultVisible(false);
            setShowFinalResult(false);
          }}
        />
      </div>
    </Layout>
  );
};

export default SenStudyPage;
