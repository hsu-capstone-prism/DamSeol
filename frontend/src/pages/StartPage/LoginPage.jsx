import React from "react";
import "../../styles/LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-container">
      <h2>로그인</h2>
      <div className="input-group">
        <input type="text" placeholder="아이디" />
      </div>
      <div className="input-group">
        <input type="password" placeholder="비밀번호" />
      </div>
      <p className="forgot-password">비밀번호를 잊으셨나요?</p>
      <div className="button-group">
        <button className="login-button">로그인</button>
        <button className="signup-button">회원가입</button>
      </div>
      <p className="social-text">소셜 계정으로 로그인</p>
      <div className="social-icons">
        <button className="social-btn kakao">K</button>
        <button className="social-btn naver">N</button>
        <button className="social-btn google">G</button>
        <button className="social-btn facebook">F</button>
        <button className="social-btn apple">A</button>
      </div>
    </div>
  );
};

export default LoginPage;
