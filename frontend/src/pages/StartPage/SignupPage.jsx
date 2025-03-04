import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    member_id: "",
    password: "",
    passwordCheck: "",
    email: "",
  });

  const [passwordError, setPasswordError] = useState(""); // 비밀번호 불일치 오류 메시지

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 비밀번호 확인 입력 시 검증
    if (name === "passwordCheck") {
      if (formData.password !== value) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError(""); // 오류 메시지 제거
      }
    }
  };

  const handleSignup = () => {
    const { name, member_id, password, passwordCheck, email } = formData;

    if (!name || !member_id || !password || !passwordCheck || !email) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("회원가입이 완료되었습니다!");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">회원가입</h2>
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="이름"
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
            type="text"
            name="member_id"
            placeholder="아이디"
            value={formData.member_id}
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
