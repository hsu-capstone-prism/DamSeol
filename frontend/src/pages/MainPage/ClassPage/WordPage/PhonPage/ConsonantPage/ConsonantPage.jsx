import React from "react";
import Layout from "../../../../Layout";
import { Link } from "react-router-dom";
import "../../../../../../styles/ConsonantPage.css";

const consonants = [
  "ㄱ",
  "ㄴ",
  "ㄷ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅅ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const ConsonantPage = () => {
  return (
    <Layout>
      <div className="consonant">
        <section className="consonant-section">
          <h2>자음 목록</h2>
          <div className="consonant-box-container">
            {consonants.map((consonant) => (
              <Link to={`/phon/consonant/study/${consonant}`} key={consonant}>
                <div className="consonant-box">{consonant} 단어</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ConsonantPage;
