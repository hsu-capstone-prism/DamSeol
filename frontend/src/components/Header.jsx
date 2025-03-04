import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <div className="header-center">
        <h1 className="logo">LOREM IPSUM</h1>
        <div className="header-search">
          <input type="text" placeholder="Search" className="search" />
          <button className="search-btn">🔍</button>
        </div>
      </div>
      <div className="header-right">
        <button className="profile-btn" onClick={toggleProfileMenu}>
          👤
        </button>
        {isProfileOpen && (
          <div className="profile-menu">
            <ul className="profile-options">
              <li>
                <button className="profile-option">👤 내 프로필</button>
              </li>
              <li>
                <button className="profile-option">⚙ 환경설정</button>
              </li>
              <li>
                <button className="profile-option">⬇ PC 앱 다운로드</button>
              </li>
              <li>
                <button className="profile-option" onClick={handleLogout}>
                  🔄 로그아웃
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <ul className="sidebar-menu">
          <li>Home</li>
          <li>Class</li>
          <li>Report</li>
          <li>Game</li>
        </ul>
      </div>
      {/* 메뉴 열렸을 때 배경 클릭 시 닫기 */}
      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;
