import React, { useState, useEffect } from "react";
import "../../../styles/GamePage.css";
import GameVideo from "../../../components/GameVideo";
import ProgressBar from "../../../components/GameProgressBar";
import axios from "axios";

const getAuthToken = () => localStorage.getItem("authToken");

const GamePage = () => {
  const [gameData, setGameData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState(null);
  const [error, setError] = useState(null);

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

        while (selected.length < 5) {
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

  const current = gameData[selectedIndex];

  useEffect(() => {
    const fetchVideo = async () => {
      if (!current || !current.videoFileName) return;

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
          if (prevUrl) URL.revokeObjectURL(prevUrl); // 🔹 이전 URL 해제
          return videoURL;
        });
      } catch (error) {
        console.error("비디오를 불러오는 중 오류 발생:", error);
        setError(error.message || "비디오를 불러오는데 실패했습니다.");
      }
    };
    fetchVideo();
  }, [current]);

  const handleStart = () => setStarted(true);

  const handleAnswer = (choiceIndex) => {
    if (!current || !current.choices || !current.choices[choiceIndex]) return;

    const selectedChoice = current.choices[choiceIndex];
    const isCorrect = selectedChoice.correct;

    setUserAnswers((prev) => [...prev, selectedChoice.text]);
    setAnswerStatus(isCorrect ? "정답입니다!" : "오답입니다!");

    if (selectedIndex === gameData.length - 1) {
      setIsFinished(true);
      const totalCorrect = [...userAnswers, selectedChoice.text].filter(
        (ans, idx) =>
          ans === gameData[idx]?.choices.find((c) => c.correct)?.text
      ).length;
      const totalScore = totalCorrect;
      const avgScore = ((totalCorrect / gameData.length) * 100).toFixed(1);
      localStorage.setItem("gameTotalScore", totalScore.toString());
      localStorage.setItem("gameAvgScore", avgScore.toString());
    }
  };

  const handleNext = () => {
    setAnswerStatus(null);
    if (selectedIndex === gameData.length - 1) setIsFinished(true);
    else setSelectedIndex((prev) => prev + 1);
  };

  const handleStepClick = (index) => {
    if (index <= selectedIndex) setSelectedIndex(index);
  };

  if (isLoading)
    return (
      <div className="game-container">
        <p>게임 데이터를 불러오는 중입니다...</p>
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
        <section className="game-section">
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
            <h2 className="game-result-title">결과</h2>
            <p className="game-result-description">
              총 점수:{" "}
              {
                userAnswers.filter(
                  (ans, idx) =>
                    ans === gameData[idx].choices.find((c) => c.correct)?.text
                ).length
              }
              /{gameData.length}점<br />
              평균 점수:{" "}
              {(
                (userAnswers.filter(
                  (ans, idx) =>
                    ans === gameData[idx].choices.find((c) => c.correct)?.text
                ).length /
                  gameData.length) *
                100
              ).toFixed(1)}
              %
            </p>
            <ul className="game-answer-list">
              {gameData.map((game, index) => {
                const userAnswer = userAnswers[index];
                const correctAnswer = game.choices.find((c) => c.correct)?.text;
                const isCorrect = userAnswer === correctAnswer;
                return (
                  <li key={index} style={{ marginBottom: "1rem" }}>
                    <strong>Q{index + 1}:</strong> {game.situation}
                    <br />
                    <strong>선택한 답:</strong> {userAnswer || "선택 안 함"}
                    <br />
                    <strong>정답:</strong> {correctAnswer}
                    <br />
                    <span style={{ color: isCorrect ? "green" : "red" }}>
                      {isCorrect ? "정답" : "오답"}
                    </span>
                  </li>
                );
              })}
            </ul>
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
          <h2>Game</h2>
          <div className="game-box-wrapper">
            <div className="media-section">
              {/* 🔹 key 추가로 비디오 리렌더링 유도 */}
              <GameVideo key={videoSrc} videoSrc={videoSrc} />
            </div>
            <div className="text-section">
              <h2 className="situation-text">{current.situation}</h2>
              {answerStatus && (
                <div className="answer-status">
                  <p
                    className={
                      answerStatus.includes("정답") ? "correct" : "incorrect"
                    }
                  >
                    {answerStatus}
                  </p>
                  {selectedIndex < gameData.length - 1 && (
                    <button className="next-button" onClick={handleNext}>
                      다음 문제
                    </button>
                  )}
                </div>
              )}
              <div className="choices">
                {current.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answerStatus !== null}
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            </div>
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
