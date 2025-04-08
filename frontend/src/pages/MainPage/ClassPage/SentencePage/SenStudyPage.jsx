import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import { useParams, useLocation } from "react-router-dom";
import "../../../../styles/SenStudyPage.css";
import MicButton from "../../../../components/SenMicButton";
import ProgressBar from "../../../../components/SenProgressBar";
import axios from "axios";
import { Radar } from "react-chartjs-2";

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
  const [isFinalResultVisible, setIsFinalResultVisible] = useState(false);
  const location = useLocation();
  const symbol = location.state?.symbol || "알 수 없음";
  const [waveformImageSrc, setWaveformImageSrc] = useState(null);
  const [pitchImageSrc, setPitchImageSrc] = useState(null);
  const [showWaveformPopup, setShowWaveformPopup] = useState(false);
  const [showPitchPopup, setShowPitchPopup] = useState(false);

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

  const fetchAnalysisImages = async (waveformImage, pitchImage) => {
    try {
      const token = getAuthToken();

      const [waveformRes, pitchRes] = await Promise.all([
        axios.get(
          `http://localhost:8080/api/images/waveform/${waveformImage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            responseType: "blob",
          }
        ),
        axios.get(`http://localhost:8080/api/images/pitch/${pitchImage}`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }),
      ]);

      setWaveformImageSrc(URL.createObjectURL(waveformRes.data));
      setPitchImageSrc(URL.createObjectURL(pitchRes.data));
    } catch (error) {
      console.error("분석 이미지 불러오기 실패:", error);
    }
  };

  const handleUploadComplete = (data) => {
    const updated = [...uploadResultList];
    updated[selectedIndex] = {
      ...data,
      waveformImage: data.waveformFileName,
      pitchImage: data.pitchFileName,
    };
    setUploadResultList(updated);
    setIsResultVisible(true);
    if (data.waveformFileName && data.pitchFileName) {
      fetchAnalysisImages(data.waveformFileName, data.pitchFileName);
    }
  };

  const renderFinalResult = () => {
    const validResults = uploadResultList.filter(Boolean);
    const averageAccuracy = (
      validResults.reduce((acc, cur) => acc + (cur.accuracy || 0), 0) /
      validResults.length
    ).toFixed(0);
    const avgRhythm = (
      validResults.reduce((acc, cur) => acc + (cur.rhythm || 0), 0) /
      validResults.length
    ).toFixed(0);
    const avgPitch = (
      validResults.reduce((acc, cur) => acc + (cur.pitch || 0), 0) /
      validResults.length
    ).toFixed(0);

    const chartData = {
      labels: ["정확도", "리듬", "피치"],
      datasets: [
        {
          label: "음성 분석 결과",
          data: [averageAccuracy, avgRhythm, avgPitch],
          backgroundColor: "rgba(37, 99, 235, 0.2)",
          borderColor: "#2563eb",
          pointBackgroundColor: "#2563eb",
          pointBorderColor: "#fff",
          fill: true,
        },
      ],
    };

    return (
      <div className="final-result">
        <h2>{localStorage.getItem("username") || "사용자"}님의 학습 결과</h2>
        <div className="final-result-grid">
          <div className="final-left">
            <p className="final-title">음성 분석 결과</p>
            <div className="chart-wrapper">
              <Radar
                data={chartData}
                options={{
                  scales: {
                    r: {
                      suggestedMin: 0,
                      suggestedMax: 100,
                      ticks: { stepSize: 20 },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="final-right">
            <p className="final-title">학습 팁</p>
            <p className="tip-content">
              'ㅍ'과 'ㄱ'의 발음을 구분하는 연습이 필요해요. 'ㅍ' 발음 시 입술을
              살짝 닫았다가 터뜨리는 느낌으로 연습해보세요. 😊
            </p>
          </div>
        </div>
        <div className="button-group">
          <button
            className="retry-btn"
            onClick={() => window.location.reload()}
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
    );
  };

  if (loading) return <p>📡 데이터 로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="sen-study">
        <nav className="breadcrumb">
          <span>문장 학습</span> ➝ <span className="highlight">{symbol}</span>
        </nav>

        {isFinalResultVisible ? (
          renderFinalResult()
        ) : (
          <section className="sen-display">
            {sentences.length > 0 ? (
              <h1 className="sen">{sentences[selectedIndex].text}</h1>
            ) : (
              <p>해당하는 문장이 없습니다.</p>
            )}

            {isResultVisible && uploadResultList[selectedIndex] ? (
              <div className="sen-result">
                <h2 className="sen-user-pronunciation">
                  {uploadResultList[selectedIndex].pron}
                </h2>
                {uploadResultList[selectedIndex].details && (
                  <p className="sen-details">
                    {uploadResultList[selectedIndex]?.details?.replace(
                      /\. /g,
                      ".\n"
                    )}
                  </p>
                )}

                <div className="sen-result-bottom-container">
                  <div className="sen-button-group">
                    <button onClick={() => setShowWaveformPopup(true)}>
                      Waveform 보기
                    </button>
                    <button onClick={() => setShowPitchPopup(true)}>
                      Pitch 보기
                    </button>
                    {selectedIndex === 2 &&
                      isResultVisible &&
                      uploadResultList[selectedIndex] && (
                        <button
                          className="sen-final-result-btn"
                          onClick={() => setIsFinalResultVisible(true)}
                        >
                          최종 결과화면 보기
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ height: "80px" }} />
            )}
          </section>
        )}

        {!isResultVisible && !isFinalResultVisible && (
          <MicButton
            selectedIndex={selectedIndex}
            sentences={sentences}
            onUploadComplete={handleUploadComplete}
          />
        )}

        {!isFinalResultVisible && (
          <ProgressBar
            currentStep={selectedIndex}
            totalSteps={sentences.length}
            onStepClick={(index) => {
              setSelectedIndex(index);
              setIsResultVisible(false);
              setShowWaveformPopup(false);
              setShowPitchPopup(false);
            }}
          />
        )}

        {showWaveformPopup && waveformImageSrc && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button
                className="popup-close"
                onClick={() => setShowWaveformPopup(false)}
              >
                X
              </button>
              <img src={waveformImageSrc} alt="Waveform 분석 이미지" />
            </div>
          </div>
        )}
        {showPitchPopup && pitchImageSrc && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button
                className="popup-close"
                onClick={() => setShowPitchPopup(false)}
              >
                X
              </button>
              <img src={pitchImageSrc} alt="Pitch 분석 이미지" />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SenStudyPage;
