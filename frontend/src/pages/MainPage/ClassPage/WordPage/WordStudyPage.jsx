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
  const [resultList, setResultList] = useState([]);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhon, setSelectedPhon] = useState("");
  const [showFinalResult, setShowFinalResult] = useState(false);

  const location = useLocation();
  const symbol = location.state?.symbol || "알 수 없음";
  const username = localStorage.getItem("username") || "사용자";

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
          setResultList(new Array(wordsRes.data.length).fill(null));
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
    setResultList((prev) => {
      const updated = [...prev];
      updated[selectedIndex] = data;
      return updated;
    });
    setIsResultVisible(true);
  };

  const openImageModal = async (phon) => {
    const phonMapping = {
      ㄱ: "g.png",
      ㄷ: "d.png",
    };

    const imageName = phonMapping[phon.trim()];
    if (!imageName) return;

    try {
      const token = getAuthToken();
      const response = await axios.get(`http://localhost:8080/${imageName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const imageBlob = URL.createObjectURL(response.data);
      setImageSrc(imageBlob);
      setSelectedPhon(phon);
      setIsModalOpen(true);
    } catch (error) {
      console.error("이미지 로드 실패:", error);
    }
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
      <div className="word-study">
        <nav className="breadcrumb">
          <span>단어 학습</span> ➝ <span className="highlight">{symbol}</span>
        </nav>

        <section className="word-display">
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

              {isResultVisible && resultList[selectedIndex] && (
                <div className="word-result">
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
                              <button
                                key={index}
                                className="suggestion-btn"
                                onClick={() => openImageModal(phon)}
                              >
                                {phon}
                              </button>
                            ))}
                      </div>
                    </div>
                    <div className="score-container">
                      {selectedIndex === words.length - 1 && (
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

        {!isResultVisible && (
          <MicButton
            selectedIndex={selectedIndex}
            word={words[selectedIndex]}
            totalWords={words.length}
            onUploadComplete={handleUploadComplete}
          />
        )}

        <ProgressBar
          currentStep={selectedIndex}
          totalSteps={words.length}
          onStepClick={(index) => {
            setSelectedIndex(index);
            setIsResultVisible(false);
            setShowFinalResult(false);
          }}
        />
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content">
            <h2 className="modal-title">{selectedPhon}</h2>
            <img
              src={imageSrc}
              alt="발음 학습 이미지"
              className="modal-image"
            />
            <button
              className="modal-confirm-btn"
              onClick={() => setIsModalOpen(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default WordStudy;
