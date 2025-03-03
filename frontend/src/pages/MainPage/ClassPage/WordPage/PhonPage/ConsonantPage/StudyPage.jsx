import React, { useState, useEffect } from "react";
import Layout from "../../../../Layout";
import { useParams } from "react-router-dom";
import "../../../../../../styles/StudyPage.css";
import MicButton from "../../../../../../components/MicButton";
import ProgressBar from "../../../../../../components/ProgressBar";
import wordsData from "../../../../../../data/wordsData";

const WordStudy = () => {
  const { letter } = useParams();
  const words = wordsData[letter] || [];

  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    setSelectedIndex(0);
  }, [letter]);

  if (!words.length) return <p>해당 자음에 대한 단어가 없습니다.</p>;

  return (
    <Layout>
      <div className="word-study">
        <nav className="breadcrumb">
          <span>단어 학습</span> ➝ <span className="highlight">{letter}</span>
        </nav>

        <section className="word-display">
          <h1 className="word">{words[selectedIndex]}</h1>
          <p className="word-pronunciation">[{words[selectedIndex]}]</p>
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
