import React from "react";
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

const ReportPage = () => {
  const weeklyData = {
    labels: ["1주차", "2주차", "3주차", "4주차"],
    datasets: [
      {
        label: "발음",
        data: [4.3, 2.5, 3.0, 5.0],
        borderColor: "#0056b3",
        backgroundColor: "rgba(0, 86, 179, 0.2)",
        fill: false,
      },
      {
        label: "음정",
        data: [2.4, 4.4, 3.8, 2.8],
        borderColor: "#ff8c00",
        backgroundColor: "rgba(255, 140, 0, 0.2)",
        fill: false,
      },
      {
        label: "리듬",
        data: [4.5, 3.0, 4.2, 4.8],
        borderColor: "#008000",
        backgroundColor: "rgba(0, 128, 0, 0.2)",
        fill: false,
      },
    ],
  };

  const radarData = {
    labels: ["정확도", "피치", "리듬"],
    datasets: [
      {
        label: "음성 분석 결과",
        data: [86, 70, 96],
        backgroundColor: "rgba(0, 86, 179, 0.2)",
        borderColor: "#0056b3",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="report-container">
      <h1 className="section-title">Report</h1>
      <section className="report-learning-section">
        <h2>주차별 정확도 추이</h2>
        <div className="chart-container">
          <Line data={weeklyData} />
        </div>
      </section>

      {/* 피드백 + 5각형 그래프 */}
      <section className="report-learning-section feedback-section">
        <div className="radar-chart-container">
          <Radar data={radarData} />
        </div>
        <div className="feedback-box">
          <p>
            <strong>발음 정확도:</strong> 86% (훌륭해요! 😊)
          </p>
          <p>
            <strong>평균 RMS:</strong> 낮은 편이에요. 조금 더 큰 목소리로
            또렷하게 발음해보세요. 😌
          </p>
          <p>
            <strong>음정 변화율:</strong> 다소 높은 편이에요. 천천히 말하면서
            음의 변화를 줄여봐요. 🎤
          </p>
          <p>
            <strong>말하기 속도:</strong> 전반적으로 양호해요. 👍
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
