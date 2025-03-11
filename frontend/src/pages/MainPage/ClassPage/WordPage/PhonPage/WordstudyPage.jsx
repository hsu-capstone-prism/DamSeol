import React, { useState, useEffect } from "react";
import Layout from "../../../Layout";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "../../../../../styles/StudyPage.css";
import MicButton from "../../../../../components/MicButton";
import ProgressBar from "../../../../../components/ProgressBar";

const letterToRoman = {
  ㄱ: "G",
  ㄴ: "N",
  ㄷ: "D",
  ㄹ: "R",
  ㅁ: "M",
  ㅂ: "B",
  ㅅ: "S",
  ㅇ: "O",
  ㅈ: "J",
  ㅊ: "CH",
  ㅋ: "K",
  ㅌ: "T",
  ㅍ: "P",
  ㅎ: "H",
  ㅣ: "I",
  ㅡ: "EU",
  ㅜ: "U",
  ㅔ: "E",
  ㅓ: "EO",
  ㅗ: "O",
  ㅐ: "AE",
  ㅏ: "A",
};

const WordstudyPage = () => {
  const { letter } = useParams();
  const location = useLocation();
  const [words, setWords] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("🌍 현재 URL:", location.pathname);
  console.log("📌 useParams() 값:", letter);

  useEffect(() => {
    if (!letter) {
      console.error("❌ [오류] letter 값이 없습니다.");
      setError("잘못된 접근입니다.");
      setLoading(false);
      return;
    }

    const romanizedLetter = letterToRoman[letter] || letter;
    console.log(`🔍 변환된 값: ${letter} → ${romanizedLetter}`);

    const fetchWords = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(`📡 [API 요청] 서브카테고리 ID 조회: ${romanizedLetter}`);

        const subcategoryResponse = await axios.get(
          `/api/subcategories/name=${encodeURIComponent(romanizedLetter)}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log("✅ [응답] 서브카테고리 ID:", subcategoryResponse.data);

        if (
          !subcategoryResponse.data ||
          subcategoryResponse.data.length === 0
        ) {
          throw new Error("❌ [오류] 서브카테고리 ID를 찾을 수 없습니다.");
        }

        // 서브카테고리 ID 가져오기
        const subcategoryId = Array.isArray(subcategoryResponse.data)
          ? subcategoryResponse.data[0].id
          : subcategoryResponse.data.id;

        console.log(
          `📡 [API 요청] 단어 목록 조회 - subcategoryId: ${subcategoryId}`
        );

        const wordResponse = await axios.get(
          `/api/words/subcategoryId=${subcategoryId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log("✅ [응답] 단어 목록:", wordResponse.data);

        if (!wordResponse.data || wordResponse.data.length === 0) {
          setError("해당 자음에 대한 단어가 없습니다.");
        } else {
          setWords(wordResponse.data);
          setSelectedIndex(0);
        }
      } catch (err) {
        console.error(
          "❌ [오류] API 요청 실패:",
          err.response?.status,
          err.response?.data || err.message
        );

        let errorMessage = `API 요청 오류 (${
          err.response?.status || "Unknown"
        }): ${err.response?.data?.message || err.message}`;

        if (err.response?.status === 403) {
          errorMessage =
            "API 요청 오류 (403): 권한 없음 - 백엔드에서 차단됨 (로그인 필요 가능성 있음)";
        } else if (err.response?.status === 404) {
          errorMessage =
            "API 요청 오류 (404): 데이터를 찾을 수 없음 - 올바른 서브카테고리인지 확인";
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [letter]);

  return (
    <Layout>
      <div className="word-study">
        <nav className="breadcrumb">
          <span>단어 학습</span> ➝ <span className="highlight">{letter}</span>
        </nav>

        {loading ? (
          <p className="loading-message">로딩 중...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <section className="word-display">
              <h1 className="word">{words[selectedIndex]?.text}</h1>
              <p className="word-pronunciation">
                [{words[selectedIndex]?.word_pron}]
              </p>
            </section>

            <MicButton />

            <ProgressBar
              currentStep={selectedIndex}
              totalSteps={words.length}
              onStepClick={(index) => setSelectedIndex(index)}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default WordstudyPage;
