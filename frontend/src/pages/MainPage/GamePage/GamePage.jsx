import React, { useState, useEffect } from "react";
import "../../../styles/GamePage.css";
import GameVideo from "../../../components/GameVideo";
import ProgressBar from "../../../components/GameProgressBar";
import axios from "axios";
import Loading from "../../../components/Loading";

const getAuthToken = () => localStorage.getItem("authToken");

const GAME_NUMBER = 5; // 게임 문제 수

const GamePage = () => {
  const [gameData, setGameData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState(null);
  const [error, setError] = useState(null);
  const correctRate = Math.round(
    (userAnswers.filter(
      (ans, idx) => ans === gameData[idx].choices.find((c) => c.correct)?.text
    ).length /
      gameData.length) *
      100
  );

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem("authToken");

        if (!token)
          throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.");

        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          "http://localhost:8080/api/scenarios",
          { headers }
        );

        const selected = [];
        const shuffled = [...response.data];

        while (selected.length < GAME_NUMBER) {
          const randomIndex = Math.floor(Math.random() * shuffled.length);
          const selectedItem = shuffled[randomIndex];
          if (!selected.includes(selectedItem)) {
            selected.push(selectedItem);
          }
        }
        setGameData(selected);
      } catch (error) {
        console.error("게임 데이터를 불러오는 중 오류 발생:", error);
        setError(error.message || "게임 데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGameData();
  }, []);

  // 현재 선택된 게임 데이터
  const current = gameData[selectedIndex];

  useEffect(() => {
    const fetchVideo = async () => {
      //if (!current || !current.videoFileName) return;
      if (!gameData || gameData.length === 0) return;
      if (selectedIndex == null || selectedIndex >= gameData.length) return;

      try {
        const token = getAuthToken();
        const response = await axios.get(
          `http://localhost:8080/${current.videoFileName}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            responseType: "blob",
          }
        );

        const videoBlob = new Blob([response.data], { type: "video/mp4" });
        const videoURL = URL.createObjectURL(videoBlob);

        setVideoSrc((prevUrl) => {
          if (prevUrl) URL.revokeObjectURL(prevUrl);
          return videoURL;
        });
      } catch (error) {
        console.error("비디오를 불러오는 중 오류 발생:", error);
        setError(error.message || "비디오를 불러오는데 실패했습니다.");
      }
    };
    fetchVideo();
  }, [current, gameData, selectedIndex]);

  const handleStart = () => setStarted(true);

  const handleAnswer = (choiceIndex) => {
    if (!current || !current.choices || !current.choices[choiceIndex]) return;

    const selectedChoice = current.choices[choiceIndex];

    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[selectedIndex] = selectedChoice.text;
      return updated;
    });
  };

  const handleNext = () => {
    if (selectedIndex === gameData.length - 1) {
      setIsFinished(true);
      const totalCorrect = [...userAnswers].filter(
        (ans, idx) =>
          ans === gameData[idx]?.choices.find((c) => c.correct)?.text
      ).length;

      const totalScore = (totalCorrect / gameData.length) * 100;
      if (localStorage.getItem("gameAvgScore") === null) {
        localStorage.setItem("gameAvgScore", totalScore);
      }
      const avgScore =
        ((totalCorrect / gameData.length) * 100 +
          parseInt(localStorage.getItem("gameAvgScore"))) /
        2;
      localStorage.setItem("gameTotalScore", totalScore.toString());
      localStorage.setItem("gameAvgScore", avgScore.toString());
    } else {
      setVideoSrc(null);
      setSelectedIndex((prev) => prev + 1);
    }
  };

  const handleStepClick = (index) => {
    if (index <= selectedIndex) setSelectedIndex(index);
  };

  if (isLoading)
    return (
      <div className="game-container">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="game-container">
        <p>오류: {error}</p>
      </div>
    );

  return (
    <div className="game-container">
      {!started ? (
        <section className="game-section game-section-start">
          <div className="game-start-screen">
            <p className="game-start-title">
              입을 잘 보고, 마음의 귀를 열어봐요!
            </p>
            <p className="game-start-description">
              소리는 없어요. 화면 속 인물이 어떤 말을 했는지 <br />
              입모양을 보고 가장 어울리는 문장을 골라보세요!
            </p>
            <button className="game-start-button" onClick={handleStart}>
              Start!
            </button>
          </div>
        </section>
      ) : isFinished && showResult ? (
        <section className="game-section">
          <div className="game-result-screen">
            <h2 className="game-result-title">학습 결과 요약</h2>
            <div className="result-top">
              <div className="circle-chart">
                <div
                  className="circle-chart"
                  style={{ "--percent": `${correctRate * 3.6}deg` }}
                >
                  <div className="circle-text">
                    <p>정답률</p>
                    <h3>{correctRate}%</h3>
                  </div>
                </div>
              </div>
              <div className="score-text">
                <p>
                  총 점수:{" "}
                  {userAnswers.filter(
                    (ans, idx) =>
                      ans === gameData[idx].choices.find((c) => c.correct)?.text
                  ).length *
                    (100 / gameData.length)}
                  /100점
                </p>
              </div>
            </div>

            <table className="result-table">
              <thead>
                <tr>
                  <th>문항</th>
                  <th>내가 선택한 답</th>
                  <th>정답</th>
                  <th>결과</th>
                </tr>
              </thead>
              <tbody>
                {gameData.map((game, index) => {
                  const userAnswer = userAnswers[index];
                  const correctAnswer = game.choices.find(
                    (c) => c.correct
                  )?.text;
                  const isCorrect = userAnswer === correctAnswer;

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{userAnswer || "선택 안 함"}</td>
                      <td>{correctAnswer}</td>
                      <td style={{ color: isCorrect ? "#1E90FF" : "#e74c3c" }}>
                        {isCorrect ? "✔️" : "❌"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              className="game-home-button"
              onClick={() => (window.location.href = "/main")}
            >
              홈으로
            </button>
          </div>
        </section>
      ) : isFinished ? (
        <section className="game-section">
          <div className="game-finish-screen">
            <p className="game-finish-title">게임 종료!</p>
            <p className="game-finish-description">
              수고하셨습니다! 결과를 확인해보세요.
            </p>
            <button
              className="game-finish-button"
              onClick={() => setShowResult(true)}
            >
              결과 보기
            </button>
          </div>
        </section>
      ) : (
        <section className="game-section">
          <div className="game-box-wrapper">
            <div className="media-section">
              <GameVideo key={videoSrc} videoSrc={videoSrc} />
            </div>
            <div className="text-section">
              <h2 className="situation-text">{current.situation}</h2>
              <div className="choices">
                {current.choices.map((choice, index) => {
                  const isSelected = userAnswers[selectedIndex] === choice.text;
                  const isCorrectChoice = choice.correct;
                  const isAnswered = userAnswers[selectedIndex] !== undefined;

                  let buttonClass = "choice-button";
                  if (isAnswered && isSelected) {
                    buttonClass += isCorrectChoice ? " correct" : " incorrect";
                  }

                  return (
                    <button
                      key={index}
                      className={buttonClass}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswered}
                    >
                      {choice.text}
                    </button>
                  );
                })}
              </div>
            </div>
            {userAnswers[selectedIndex] !== undefined && (
              <button className="next-button" onClick={handleNext}>
                {selectedIndex === gameData.length - 1
                  ? "게임 종료"
                  : "다음 문제 →"}
              </button>
            )}
          </div>
          <ProgressBar
            currentStep={selectedIndex}
            totalSteps={gameData.length}
            onStepClick={handleStepClick}
          />
        </section>
      )}
    </div>
  );
};

export default GamePage;
