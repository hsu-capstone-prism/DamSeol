import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios 추가
import "../../styles/SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    email: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "passwordCheck") {
      if (formData.password !== value) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSignup = async () => {
    const { username, password, passwordCheck, email } = formData;

    if (!username || !password || !passwordCheck || !email) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);

      const response = await axios.post("/api/join", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      console.log("회원가입 응답:", response.data); //응답 로그

      if (response.status === 200) {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      } else {
        alert(response.data.message || "회원가입에 실패하였습니다.");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);

      if (error.response) {
        alert(
          error.response.data.message || "서버 오류로 회원가입에 실패했습니다."
        );
      } else {
        alert("서버에 연결할 수 없습니다.");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">회원가입</h2>
        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="passwordCheck"
            placeholder="비밀번호 확인"
            value={formData.passwordCheck}
            onChange={handleChange}
          />
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}
        <button className="signup-button" onClick={handleSignup}>
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
