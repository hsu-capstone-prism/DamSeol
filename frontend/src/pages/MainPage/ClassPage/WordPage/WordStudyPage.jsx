import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import { useParams, useLocation } from "react-router-dom";
import "../../../../styles/StudyPage.css";
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
  const [summaryTip, setSummaryTip] = useState("");
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

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
    const x = data.score;
    const adjustedScore = ((x / 100) + (1 - (x / 100)) * ((x / 100) ** 2)) * 100;

    setResultList((prev) => {
      const updated = [...prev];
      updated[selectedIndex] = {...data, score: Number(adjustedScore.toFixed(1))};
      return updated;
    });

    setIsResultVisible(true);
  };

  const openImageModal = async (phon) => {
    const phonMapping = {
      ㄴ: "n.png",
      ㄹ: "r.png",
      ㅁ: "m.png",
      ㅂ: "b.png",
      ㅅ: "s.png",
      ㅈ: "j.png",
      ㅊ: "ch.png",
      ㅋ: "k.png",
      ㅌ: "t.png",
      ㅍ: "p.png",
      ㅎ: "h.png",
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
    const allDetails = validResults.map((r) => r.evaluation).join(" \n");

    return { avgScore, uniqueWrongPhons, allDetails };
  };

  const { avgScore, uniqueWrongPhons, allDetails } = getSummaryResult();

  // 요약 API 호출
  const fetchSummaryTip = async () => {
    setIsLoadingSummary(true);
    try {
      const token = getAuthToken();
      const formData = new FormData();
      formData.append("text", allDetails);

      const response = await axios.post(
        "http://localhost:8080/api/summarize/word",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("word요약 API 응답 확인:", response.data);

      setSummaryTip(response.data.response || "요약 결과가 없습니다.");
    } catch (error) {
      console.error("요약 API 오류:", error);
      setSummaryTip("요약을 가져오는 데 실패했습니다.");
    } finally {
      setShowFinalResult(true);
      setIsLoadingSummary(false);
    }
  };

  // 틀린 단어 빨간색 처리
  const highlightWrongPron = (text, wrongIndicesStr) => {
    if (!text || !wrongIndicesStr) return text;

    const wrongIndices = wrongIndicesStr
      .split(",")
      .map((i) => parseInt(i, 10))
      .filter((n) => !isNaN(n));

    return text.split("").map((char, idx) => (
      <span
        key={idx}
        style={{
          color: wrongIndices.includes(idx) ? "red" : "black",
          fontWeight: wrongIndices.includes(idx) ? "bold" : "normal",
        }}
      >
        {char}
      </span>
    ));
  };

  if (loading) return <p>📡 데이터 로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="study-page word-study">
        <nav className="breadcrumb">
          <span>단어 학습</span> ➝ <span className="highlight">{symbol}</span>
        </nav>

        <section className="display-container">
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
                  <p className="tip-content">{summaryTip || allDetails}</p>
                </div>
              </div>

              <div className="button-group">
                <button
                  className="retry-btn"
                  onClick={() => {
                    setShowFinalResult(false);
                    setSelectedIndex(0);
                    setIsResultVisible(false);
                    setSummaryTip("");
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
                  <h1 className="content-text">{words[selectedIndex].text}</h1>
                  <p className="word-pronunciation">
                    [{words[selectedIndex].wordPron}]
                  </p>
                </>
              ) : (
                <p>해당하는 단어가 없습니다.</p>
              )}
              <div className="word-result">
                {isResultVisible && resultList[selectedIndex] ? (
                  <>
                    <p className="pronunciation-label">{username}님의 발음</p>
                    <h2 className="user-pronunciation">
                      {highlightWrongPron(
                        resultList[selectedIndex].pron,
                        resultList[selectedIndex].wrongPhonIndices
                      )}
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
                            className={`final-result-btn ${
                              isLoadingSummary ? "loading" : ""
                            }`}
                            onClick={fetchSummaryTip}
                            disabled={isLoadingSummary}
                          >
                            {isLoadingSummary
                              ? "결과 분석 중..."
                              : "최종 결과화면 보기"}
                          </button>
                        )}
                        <p className="accuracy-label">정확도:</p>
                        <p className="score">
                          {resultList[selectedIndex].score}%
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ height: "80px" }} />
                )}
              </div>
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
            setSummaryTip("");
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
