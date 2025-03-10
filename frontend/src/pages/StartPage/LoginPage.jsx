import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // 기존 username 유지
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("아이디와 비밀번호를 입력하세요.");
      return;
    }

    console.log(username);
    console.log(password);

    try {
      // URLSearchParams를 사용하여 백엔드가 받을 수 있도록 변환
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post(
        "/api/login",
        formData, // 변경된 데이터 전송 방식
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
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
            type="text" // username 입력 유지
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
