import React, { useEffect, useState } from "react";
import { Radar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";
import "../../../styles/ReportPage.css";

ChartJS.register(
  RadialLinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const getAuthToken = () => localStorage.getItem("authToken");

const ReportPage = () => {
  const [scoreData, setScoreData] = useState(null);
  const [weeklyChartData, setWeeklyChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 평균 점수
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const token = getAuthToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(
          "http://localhost:8080/api/report/scores",
          { headers }
        );

        if (!response.data) throw new Error("응답이 비어 있습니다.");

        setScoreData({
          accuracy: response.data.avgAccuracy ?? 0,
          wordAccuracy: response.data.avgWordAccuracy ?? 0,
          sentenceAccuracy: response.data.avgSentenceAccuracy ?? 0,
          pitch: response.data.avgPitchScore ?? 0,
          rhythm: response.data.avgRhythmScore ?? 0,
        });
      } catch (err) {
        console.error("점수 데이터 요청 실패:", err);
        setError("점수 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  // 주차별 데이터
  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const token = getAuthToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(
          "http://localhost:8080/api/report/weekly",
          { headers }
        );

        const weeklyReports = response.data.weeklyReports ?? [];

        const sorted = [...weeklyReports].sort(
          (a, b) => a.weekOffset - b.weekOffset
        );

        const labels = sorted.map((r) => `${r.weekOffset + 1}주차`);
        const accuracy = sorted.map((r) => r.avgAccuracy ?? 0);
        const pitch = sorted.map((r) => r.avgPitchScore ?? 0);
        const rhythm = sorted.map((r) => r.avgRhythmScore ?? 0);

        setWeeklyChartData({
          labels,
          datasets: [
            {
              label: "발음",
              data: accuracy,
              borderColor: "#0056b3",
              backgroundColor: "rgba(0, 86, 179, 0.2)",
              fill: false,
              spanGaps: false,
            },
            {
              label: "음정",
              data: pitch,
              borderColor: "#ff8c00",
              backgroundColor: "rgba(255, 140, 0, 0.2)",
              fill: false,
              spanGaps: false,
            },
            {
              label: "리듬",
              data: rhythm,
              borderColor: "#008000",
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              fill: false,
              spanGaps: false,
            },
          ],
        });
      } catch (err) {
        console.error("주차별 데이터 요청 실패:", err);
      }
    };

    fetchWeeklyData();
  }, []);

  // Radar Chart
  const radarChartData = scoreData && {
    labels: ["정확도", "리듬", "피치"],
    datasets: [
      {
        label: "음성 분석 결과",
        data: [
          Number(scoreData.accuracy.toFixed(1)),
          Number(scoreData.rhythm.toFixed(1)),
          Number(scoreData.pitch.toFixed(1)),
        ],
        backgroundColor: "rgba(0, 86, 179, 0.2)",
        borderColor: "#0056b3",
        borderWidth: 2,
      },
    ],
  };

  const radarChartOptions = {
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
          font: { size: 14 },
        },
      },
    },
  };

  // 피드백 함수
  const getAccuracyFeedback = (score) => {
    if (score <= 30) return "매우 낮은 편이에요. 기본 발음부터 다시 익혀봐요!";
    if (score <= 50)
      return "낮은 편이에요. 조금 더 큰 목소리로 또렷하게 발음해보세요.";
    if (score <= 70)
      return "괜찮은 편이에요! 조금만 더 연습해보면 좋아질 거예요.";
    return "훌륭해요! 😊";
  };

  const getRhythmFeedback = (score) => {
    if (score <= 40) return "리듬이 불안정해요. 천천히 또박또박 연습해보세요!";
    if (score <= 70) return "다소 높은 편이에요. 리듬에 더 신경 써보면 좋아요.";
    return "안정적인 리듬이에요! 👍";
  };

  const getPitchFeedback = (score) => {
    if (score <= 40)
      return "피치 조절이 어려운 편이에요. 단어 끝을 또렷하게 말해보세요!";
    if (score <= 70) return "다소 높아요. 억양을 조금 줄여볼까요?";
    return "전반적으로 양호해요. 👍";
  };

  if (loading) return <div className="report-container">⏳ 로딩 중...</div>;
  if (error) return <div className="report-container">❌ {error}</div>;

  return (
    <div className="report-container">
      <h1 className="section-title">Report</h1>

      {/* 주차별 정확도 추이 */}
      <section className="report-learning-section">
        <h2>주차별 정확도 추이</h2>
        <div className="chart-container" style={{ height: "350px" }}>
          {weeklyChartData ? (
            <Line
              data={weeklyChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    offset: true,
                    ticks: {
                      padding: 10,
                      font: { size: 14 },
                    },
                    grid: {
                      display: true,
                      drawBorder: true,
                    },
                  },
                  y: {
                    min: 0,
                    max: 100,
                    ticks: {
                      stepSize: 10,
                      font: { size: 14 },
                    },
                    grid: {
                      color: "#ddd",
                    },
                  },
                },
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      font: { size: 14 },
                    },
                  },
                },
              }}
              height={300}
            />
          ) : (
            <p>주차별 데이터를 불러오는 중...</p>
          )}
        </div>
      </section>

      {/* Radar + 피드백 */}
      <section className="report-learning-section feedback-section">
        <div style={{ margin: "0 auto", textAlign: "center" }}>
          {radarChartData && (
            <Radar
              data={radarChartData}
              options={radarChartOptions}
              width={300}
              height={300}
            />
          )}
        </div>

        <div className="feedback-box">
          <p>
            <strong>발음 정확도 평균 :</strong> {scoreData.accuracy.toFixed(1)}%
          </p>
          <p>
            <strong>정확도 :</strong> {getAccuracyFeedback(scoreData.accuracy)}
          </p>
          <p>
            <strong>리듬 :</strong> {getRhythmFeedback(scoreData.rhythm)}
          </p>
          <p>
            <strong>피치 :</strong> {getPitchFeedback(scoreData.pitch)}
          </p>
        </div>
      </section>

      {/* 최근 학습 */}
      <section className="report-learning-section">
        <h2>최근 학습</h2>
        <div className="teacher-container">
          <div className="box teacher">
            <p>
              단어 학습: 음운의 변동 부분이 부족해요! <br />
              진도율: <strong>51.18%</strong>
            </p>
          </div>
          <div className="box teacher">
            <p>
              문장학습: 좀 더 분발하세요! <br />
              진도율: <strong>11.28%</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportPage;
