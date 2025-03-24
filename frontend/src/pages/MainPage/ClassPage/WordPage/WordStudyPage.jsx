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
  const [result, setResult] = useState(null);
  const [isResultVisible, setIsResultVisible] = useState(false); // 선택된 결과
  const [imageSrc, setImageSrc] = useState(null); // 선택된 이미지
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 관리
  const [selectedPhon, setSelectedPhon] = useState("");
  const [showFinalResult, setShowFinalResult] = useState(false);

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

  const handleUploadComplete = (data) => {
    setResult(data);
    setIsResultVisible(true);
  };

  // 모달 열기
  const openImageModal = async (phon) => {
    const phonMapping = {
      ㄱ: "g.png",
      ㄷ: "d.png",
    };

    const imageName = phonMapping[phon.trim()];
    if (!imageName) return;

    try {
      const token = localStorage.getItem("authToken");

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
                      {/* 마지막 단어에서만 최종 결과화면 보기 버튼 */}
                      {selectedIndex === words.length - 1 && (
                        <button
                          className="final-result-btn"
                          onClick={() => setShowFinalResult(true)}
                        >
                          최종 결과화면 보기
                        </button>
                      )}
                      <p className="accuracy-label">정확도</p>
                      <p className="score">{result.score}%</p>
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
            subcategoryId={subcategoryId}
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
      {/* 이미지 모달 창 */}
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
