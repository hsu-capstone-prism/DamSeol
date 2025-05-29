import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import { useParams, useLocation } from "react-router-dom";
import "../../../../styles/StudyPage.css";
import MicButton from "../../../../components/GramMicButton";
import ProgressBar from "../../../../components/GramProgressBar";
import axios from "axios";
import { Radar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Loading from "../../../../components/Loading";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement
);

const getAuthToken = () => localStorage.getItem("authToken");

const getRandomSentences = (arr, count) => {
  if (arr.length <= count) return arr;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const GramStudyPage = () => {
  const { subcategoryId } = useParams();
  const [grammars, setGrammars] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadResultList, setUploadResultList] = useState([]);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [waveformImageSrc, setWaveformImageSrc] = useState(null);
  const [pitchImageSrc, setPitchImageSrc] = useState(null);
  const [showWaveformPopup, setShowWaveformPopup] = useState(false);
  const [showPitchPopup, setShowPitchPopup] = useState(false);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [summaryTip, setSummaryTip] = useState("");
  const [finalChartData, setFinalChartData] = useState(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

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
          setGrammars(randomSentences);
          setSelectedIndex(0);
          setUploadResultList(new Array(randomSentences.length).fill(null));
        }
      } catch (err) {
        console.error("Error fetching sentences:", err);
        setError("문법 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchSentences();
  }, [subcategoryId]);

  const getSummaryResult = () => {
    const validResults = uploadResultList.filter(Boolean);
    const avg = (key) => {
      const sum = validResults.reduce((total, r) => total + (r[key] || 0), 0);
      return validResults.length ? Math.round(sum / validResults.length) : 0;
    };
    const avgCorrection = avg("correction");
    const avgPitch = avg("pitch_score");
    const avgRhythm = avg("rhythm_score");
    const allEvaluations = validResults.map((r) => r.evaluation).join("\n");

    return {
      allDetails: allEvaluations,
      avgCorrection,
      avgPitch,
      avgRhythm,
    };
  };

  const fetchSummaryTip = async () => {
    setIsLoadingSummary(true);
    const { allDetails, avgCorrection, avgPitch, avgRhythm } =
      getSummaryResult();
    try {
      const token = getAuthToken();
      const formData = new FormData();
      formData.append("text", allDetails);

      const response = await axios.post(
        "http://localhost:8080/api/summarize/sentence",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSummaryTip(response.data.response || "요약 결과가 없습니다.");
      setFinalChartData({ avgCorrection, avgPitch, avgRhythm });
    } catch (error) {
      console.error("요약 API 오류:", error);
      setSummaryTip("요약을 가져오는 데 실패했습니다.");
    } finally {
      setShowFinalResult(true);
      setIsLoadingSummary(false);
    }
  };

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

  const renderRadarChart = () => {
    if (!finalChartData) return null;
    const radarData = {
      labels: ["정확도", "리듬", "피치"],
      datasets: [
        {
          lcabel: "평균 점수",
          data: [
            finalChartData.avgCorrection,
            finalChartData.avgRhythm,
            finalChartData.avgPitch,
          ],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
        },
      ],
    };
    const radarOptions = {
      responsive: false,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            color: "#333",
          },
          pointLabels: {
            font: {
              size: 14,
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };
    return (
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <Radar
          data={radarData}
          options={radarOptions}
          width={300}
          height={300}
        />
        <p style={{ marginTop: "15px", fontSize: "18px", color: "#333" }}>
          평균 정확도 : <strong>{finalChartData.avgCorrection}%</strong>
        </p>
      </div>
    );
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

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="study-page gram-study">
        <nav className="breadcrumb">
          <span>문법 학습</span> ➝ <span className="highlight">{symbol}</span>
        </nav>

        {showFinalResult ? (
          <div className="final-result">
            <h2 style={{ textAlign: "center", marginTop: "10px" }}>
              {username}님의 문법 학습 결과
            </h2>
            <div className="final-result-grid">
              <div className="final-left">
                <p className="final-title">발음 정확도 차트</p>
                {renderRadarChart()}
              </div>
              <div className="final-right">
                <p className="final-title">학습 팁</p>
                <div className="tip-content">
                  {summaryTip.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="button-group" style={{ justifyContent: "center" }}>
              <button
                className="retry-btn"
                onClick={() => {
                  setShowFinalResult(false);
                  setSelectedIndex(0);
                  setIsResultVisible(false);
                  setSummaryTip("");
                  setFinalChartData(null);
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
            <section className="display-container">
              {grammars.length > 0 ? (
                <h1 className="content-text">{grammars[selectedIndex].text}</h1>
              ) : (
                <p>해당하는 문장이 없습니다.</p>
              )}

              {isResultVisible && uploadResultList[selectedIndex] ? (
                <div className="gram-result">
                  {uploadResultList[selectedIndex].analysis && (
                    <p className="gram-details">
                      {uploadResultList[selectedIndex].analysis}
                    </p>
                  )}
                  <div className="gram-corrections">
                    정확도: {uploadResultList[selectedIndex].correction}%
                  </div>

                  <div className="gram-result-bottom-container">
                    <div className="gram-button-group">
                      <button onClick={() => setShowWaveformPopup(true)}>
                        Waveform
                      </button>
                      <button onClick={() => setShowPitchPopup(true)}>
                        Pitch
                      </button>
                    </div>
                    {selectedIndex === 2 && (
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
                  </div>
                </div>
              ) : (
                <div style={{ height: "80px" }} />
              )}
            </section>

            {!isResultVisible && (
              <MicButton
                selectedIndex={selectedIndex}
                grammars={grammars}
                onUploadComplete={handleUploadComplete}
              />
            )}

            <ProgressBar
              currentStep={selectedIndex}
              totalSteps={grammars.length}
              onStepClick={(index) => {
                setSelectedIndex(index);
                setIsResultVisible(false);
                setShowWaveformPopup(false);
                setShowPitchPopup(false);
              }}
            />
          </>
        )}

        {showWaveformPopup && waveformImageSrc && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button
                className="modal-close"
                onClick={() => setShowWaveformPopup(false)}
              >
                X
              </button>
              <img src={waveformImageSrc} alt="Waveform 분석 이미지" />
            </div>
          </div>
        )}

        {showPitchPopup && pitchImageSrc && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button
                className="modal-close"
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

export default GramStudyPage;
