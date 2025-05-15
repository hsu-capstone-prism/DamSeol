import React from "react";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import "../../../styles/ClassPage.css";

const phonTopics = [
  { name: "음절의 끝소리", key: "FinalSound" },
  { name: "유성자음", key: "Voiced" },
  { name: "무성자음", key: "Unvoiced" },
];

const alterTopics = [
  { name: "모음조화", key: "VowelHarmony" },
  { name: "축약과 탈락", key: "ContractionAndElision" },
  { name: "자음동화", key: "ConsonantAssimilation" },
  { name: "경음화와 유성음화", key: "GlottalizationAndSonorization" },
  { name: "격음화", key: "Glottalization" },
  { name: "구개음화", key: "Palatalization" },
];

const addTopics = [
  { name: "ㅅ 첨가", key: "SInsertion" },
  { name: "ㄴ 첨가", key: "NInsertion" },
];

const WordPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="class-page word-page">
        <h1 className="section-title">단어 학습</h1>

        <section className="learning-section">
          <h2>음운</h2>
          <div className="box-container">
            <div className="box" onClick={() => navigate("/phon/vowel")}>
              <span class="material-symbols-outlined box-icon">more_horiz</span>
              모음{" "}
              <span
                style={{ marginLeft: "auto" }}
                class="material-symbols-outlined"
              >
                open_in_new
              </span>
            </div>

            <div className="box" onClick={() => navigate("/phon/consonant")}>
              <span class="material-symbols-outlined box-icon">more_horiz</span>
              자음{" "}
              <span
                style={{ marginLeft: "auto" }}
                class="material-symbols-outlined"
              >
                open_in_new
              </span>
            </div>
            {phonTopics.map((phon) => (
              <div
                key={phon.key}
                className="box"
                onClick={() =>
                  navigate("/phon/study", { state: { phonName: phon.name } })
                }
              >
                <span class="material-symbols-outlined box-icon">
                  volume_up
                </span>
                {phon.name}
              </div>
            ))}
          </div>
        </section>
        <section className="learning-section">
          <h2>음운 변동</h2>
          <div className="box-container">
            {alterTopics.map((alter) => (
              <div
                key={alter.key}
                className="box"
                onClick={() =>
                  navigate("/alter/study", { state: { alterName: alter.name } })
                }
              >
                <span class="material-symbols-outlined box-icon">
                  volume_up
                </span>
                {alter.name}
              </div>
            ))}
          </div>
        </section>
        <section className="learning-section">
          <h2>사잇소리 현상</h2>
          <div className="box-container">
            {addTopics.map((add) => (
              <div
                key={add.key}
                className="box"
                onClick={() =>
                  navigate("/add/study", { state: { addName: add.name } })
                }
              >
                <span class="material-symbols-outlined box-icon">
                  volume_up
                </span>
                {add.name}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default WordPage;
