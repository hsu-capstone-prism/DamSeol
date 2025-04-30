import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logo = isMenuOpen ? "logo-tmp-full.png" : "logo-tmp-s.png";

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /*const handleLogout = () => {
    setIsProfileOpen(false);
    navigate("/");
  };
  */

  const handleNavigate = (path) => {
    navigate(path);
  };

  const navMenu = [
    { icon: "home", text: "Home", path: "/main" },
    { icon: "school", text: "Class", path: "/class" },
    { icon: "bar_chart", text: "Report", path: "/report" },
    { icon: "sports_esports", text: "Game", path: "/game" },
  ];

  const profileMenu = [
    { icon: "person", text: "내 프로필", path: "/profile" },
    { icon: "settings", text: "환경설정", path: "/settings" },
    { icon: "download", text: "PC 앱 다운로드", path: "/download" },
    { icon: "logout", text: "로그아웃", path: "/logout" },
  ];

  return (
    <header className={`header ${isMenuOpen ? "open" : ""}`}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <h1 className="header-logo" onClick={() => handleNavigate("/main")}>
        <img src={logo} alt="logo" />
      </h1>
      <nav className="header-nav">
        <ul className="header-nav-menu">
          {navMenu.map((menu, index) => {
            const isActive = location.pathname.startsWith(menu.path);
            return (
              <li
                key={index}
                onClick={() => handleNavigate(menu.path)}
                className={isActive ? "active" : ""}
              >
                <span className="material-symbols-outlined">{menu.icon}</span>
                <span className="header-nav-menu-text">{menu.text}</span>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="header-bottom-wrapper">
        <div className="header-bottom">
          <div className="profile-container" onClick={toggleProfileMenu}>
            <div className="profile-btn">
              <span className="material-symbols-outlined">person</span>
            </div>
            <span className="profile-text">
              {localStorage.getItem("username")}
            </span>
          </div>
          {isProfileOpen && (
            <div className="profile-menu">
              <ul className="profile-options">
                {profileMenu.map((menu, index) => (
                  <li
                    key={index}
                    className="profile-option"
                    onClick={() => handleNavigate(menu.path)}
                  >
                    <span className="material-symbols-outlined">
                      {menu.icon}
                    </span>
                    <span className="profile-menu-text">{menu.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="header-toggle-btn" onClick={toggleMenu}>
        <span className="material-symbols-outlined">chevron_right</span>
      </div>
    </header>
  );
};

export default Header;
