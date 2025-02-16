import React, { useState } from "react";
import "../styles/Header.css";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn">☰</button>
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
                <button className="profile-option">🔄 로그아웃</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
