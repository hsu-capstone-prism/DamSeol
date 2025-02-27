import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    member_id: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = () => {
    const { username, member_id, password, email } = formData;
    if (username && member_id && password && email) {
      // 여기에 서버 요청 로직을 추가 가능
      alert("회원가입이 완료되었습니다!");
      navigate("/login"); // 회원가입 후 로그인 페이지로 이동
    } else {
      alert("모든 필드를 입력해주세요.");
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
            placeholder="이름"
            value={formData.username}
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
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button className="signup-button" onClick={handleSignup}>
          회원가입
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
