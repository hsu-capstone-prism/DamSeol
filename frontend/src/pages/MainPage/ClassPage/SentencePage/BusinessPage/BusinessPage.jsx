import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../Layout";
import sentenceData from "../../../../../data/sentenceData";
import "../../../../../styles/Sentence_Detail.css";

const BusinessPage = () => {
  const { category } = useParams();
  const pageData = sentenceData.find((data) => data.id === category);

  if (!pageData) {
    return <h2>존재하지 않는 페이지입니다.</h2>;
  }

  return (
    <Layout>
      <div className="sentence">
        <section className="sentence-section">
          <h2>{pageData.title}</h2>
          <div className="sentence-box-container">
            {pageData.sentences.map((sentence, index) => (
              <div key={index} className="sentence-box">
                {`${index + 1}. ${sentence}`}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BusinessPage;
