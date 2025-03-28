import React from "react";
import "../../styles/ProfilePage.css";

const MyPage = () => {
  const username = localStorage.getItem("username") || "사용자";

  return (
    <div className="mypage-container">
      <div className="mypage-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="프로필"
          className="mypage-avatar"
        />
        <h2>{username}</h2>
      </div>

      <div className="mypage-content">
        <div className="mypage-left">
          <h3>학습 진도</h3>
          <p>
            이번 주에 학습한 단어
            <br />
            <strong>25 단어</strong>
          </p>
          <p>
            이번 주에 학습한 문장
            <br />
            <strong>12 문장</strong>
          </p>
          <p>
            이번 주에 학습한 시간
            <br />
            <strong>92 분</strong>
          </p>
        </div>

        <div className="mypage-right">
          <h3>학습 피드백</h3>

          <div className="pronunciation-feedback">
            <div className="pronunciation-text">
              <p>
                <strong>잘한 발음</strong>
                <br />
                ㄱ, ㄷ, ㅅ, ㅎ
              </p>
              <p>
                <strong>개선이 필요한 발음</strong>
                <br />
                ㄴ, ㄹ, ㅌ, ㅈ
              </p>
            </div>
            <div className="accuracy-circle">
              평균 정확도
              <br />
              <span className="circle">78%</span>
            </div>
          </div>

          <p>
            <strong>음정 평가</strong>
            <br />
            음정 변화율이 <span className="highlight">높은 편</span>이에요.
            음정을 안정적으로 낼 수 있도록 ...
          </p>
          <p>
            <strong>리듬 평가</strong>
            <br />
            전반적으로 문장의 <span className="highlight">리듬이 안정적</span>
            이에요! 👍
          </p>

          <p>
            <strong>추천 학습</strong>
            <br />
            다음 주에는 <span className="highlight">유음화</span>를 복습하고,{" "}
            <span className="highlight">비음화 단어</span>를 학습해보아요.🔥
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
