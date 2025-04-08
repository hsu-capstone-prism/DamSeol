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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadResultList, setUploadResultList] = useState([]);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const location = useLocation();
  const symbol = location.state?.symbol || "알 수 없음";
  const [waveformImageSrc, setWaveformImageSrc] = useState(null);
  const [pitchImageSrc, setPitchImageSrc] = useState(null);

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

      const waveformBlob = URL.createObjectURL(waveformRes.data);
      const pitchBlob = URL.createObjectURL(pitchRes.data);

      setWaveformImageSrc(waveformBlob);
      setPitchImageSrc(pitchBlob);
    } catch (error) {
      console.error("분석 이미지 불러오기 실패:", error);
    }
  };

  const handleUploadComplete = (data) => {
    const updated = [...uploadResultList];
    updated[selectedIndex] = {
      ...data,
      waveformImage: "sample_waveform.png",
      pitchImage: "sample_pitch.png",
    };
    setUploadResultList(updated);
    setIsResultVisible(true);
    fetchAnalysisImages("sample_waveform.png", "sample_pitch.png");
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

          {isResultVisible && (
            <div className="sen-result">
              <h2 className="user-pronunciation">
                {uploadResultList[selectedIndex].pron}
              </h2>
              <div className="image-viewer">
                {waveformImageSrc && (
                  <img
                    src={waveformImageSrc}
                    alt="Waveform 분석 이미지"
                    className="result-image"
                  />
                )}
                {pitchImageSrc && (
                  <img
                    src={pitchImageSrc}
                    alt="Pitch 분석 이미지"
                    className="result-image"
                  />
                )}
              </div>

              <div className="score-container">
                {selectedIndex === sentences.length - 1 && (
                  <button
                    className="sen-final-result-btn"
                    onClick={() => alert("최종 결과 화면 준비중")}
                  >
                    최종 결과화면 보기
                  </button>
                )}
              </div>
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
