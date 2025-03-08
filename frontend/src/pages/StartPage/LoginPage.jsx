import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        { username, password }, // 요청 본문에 username, password 포함
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        navigate("/main"); // 로그인 성공 시 메인 페이지로 이동
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      if (error.response) {
        setError(error.response.data.message || "로그인에 실패하였습니다.");
      } else {
        setError("서버에 연결할 수 없습니다.");
      }
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
        {error && <p className="error-message">{error}</p>}
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
