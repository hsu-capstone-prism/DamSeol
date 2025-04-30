// Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. 인증 정보 제거
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");

    // 2. 리다이렉트
    navigate("/");
  }, [navigate]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      로그아웃 중입니다...
    </div>
  );
};

export default Logout;
