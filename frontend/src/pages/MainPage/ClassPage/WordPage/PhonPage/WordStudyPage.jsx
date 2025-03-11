import React, { useState, useEffect } from "react";
import Layout from "../../../Layout";
import { useParams } from "react-router-dom";
import "../../../../../styles/StudyPage.css";
import MicButton from "../../../../../components/MicButton";
import ProgressBar from "../../../../../components/ProgressBar";
import axios from "axios";

// ✅ JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

// ✅ 자음 목록
const consonants = [
  { symbol: "ㄱ", key: "G" },
  { symbol: "ㄴ", key: "N" },
  { symbol: "ㄷ", key: "D" },
  { symbol: "ㄹ", key: "R" },
  { symbol: "ㅁ", key: "M" },
  { symbol: "ㅂ", key: "B" },
  { symbol: "ㅅ", key: "S" },
  { symbol: "ㅇ", key: "O" },
  { symbol: "ㅈ", key: "J" },
  { symbol: "ㅊ", key: "CH" },
  { symbol: "ㅋ", key: "K" },
  { symbol: "ㅌ", key: "T" },
  { symbol: "ㅍ", key: "P" },
  { symbol: "ㅎ", key: "H" },
];

// ✅ 모음 목록
const vowels = [
  { symbol: "ㅣ", key: "I" },
  { symbol: "ㅡ", key: "EU" },
  { symbol: "ㅜ", key: "U" },
  { symbol: "ㅔ", key: "E" },
  { symbol: "ㅓ", key: "EO" },
  { symbol: "ㅗ", key: "O" },
  { symbol: "ㅐ", key: "AE" },
  { symbol: "ㅏ", key: "A" },
];

// ✅ key 값을 symbol로 변환하는 함수
const getSymbolFromKey = (key) => {
  const consonantMatch = consonants.find((con) => con.key === key);
  const vowelMatch = vowels.find((v) => v.key === key);
  return consonantMatch
    ? consonantMatch.symbol
    : vowelMatch
    ? vowelMatch.symbol
    : key;
};

const WordStudy = () => {
  const { subcategoryId } = useParams();
  const [subcategoryName, setSubcategoryName] = useState("");
  const [words, setWords] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ (1) 서브카테고리 이름 가져오기
  useEffect(() => {
    if (!subcategoryId) return;

    const fetchSubcategory = async () => {
      try {
        const token = getAuthToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(
          "http://localhost:8080/api/subcategories",
          { headers }
        );

        const subcategory = response.data.find(
          (item) => item.id === parseInt(subcategoryId)
        );

        if (subcategory) {
          setSubcategoryName(subcategory.name);
        } else {
          setError("해당 서브카테고리를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("Error fetching subcategory:", err);
        setError("서브카테고리 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchSubcategory();
  }, [subcategoryId]);

  // ✅ (2) 단어 목록 가져오기
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

  if (loading) return <p>📡 데이터 로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="word-study">
        <nav className="breadcrumb">
          <span>단어 학습</span> ➝{" "}
          <span className="highlight">{getSymbolFromKey(subcategoryName)}</span>
        </nav>
        <section className="word-display">
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
        </section>
        <MicButton />
        <ProgressBar
          currentStep={selectedIndex}
          totalSteps={words.length}
          onStepClick={(index) => setSelectedIndex(index)}
        />
      </div>
    </Layout>
  );
};

export default WordStudy;
