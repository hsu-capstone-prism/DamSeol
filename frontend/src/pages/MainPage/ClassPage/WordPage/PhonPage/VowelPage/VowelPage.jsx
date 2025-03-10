import React from "react";
import Layout from "../../../../Layout";
import { Link } from "react-router-dom";
import "../../../../../../styles/VowelPage.css";

const vowels = ["l", "ㅡ", "ㅜ", "ㅔ", "ㅓ", "ㅗ", "ㅐ", "ㅏ"];

const VowelPage = () => {
  return (
    <Layout>
      <div className="vowel">
        <section className="vowel-section">
          <h2>모음 목록</h2>
          <div className="vowel-box-container">
            {vowels.map((vowel) => (
              <Link to={`/phon/study/${vowel}`} key={vowel}>
                <div className="vowel-box">{vowel} 단어</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default VowelPage;
