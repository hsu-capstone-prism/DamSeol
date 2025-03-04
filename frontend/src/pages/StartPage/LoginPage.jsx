import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import "../../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅 사용

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      navigate("/main"); // 입력값이 있으면 MainPage로 이동
    } else {
      alert("아이디와 비밀번호를 입력하세요.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="forgot-password">비밀번호를 잊으셨나요?</p>
        <div className="button-group">
          <button className="login-button" onClick={handleLogin}>
            로그인
          </button>
          <button className="signup-button" onClick={() => navigate("/signup")}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
