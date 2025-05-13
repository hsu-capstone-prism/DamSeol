import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaSchool,
  FaChartBar,
  FaGamepad,
  FaUser,
  FaCog,
  FaDownload,
  FaSignOutAlt,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaArrowRight,
} from "react-icons/fa";
import "../styles/Header.css";

import logoFull from "../assets/images/logo-tmp-full.png";
import logoSmall from "../assets/images/logo-tmp-s.png";

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const logo = isMenuOpen ? logoFull : logoSmall;

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

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const navMenu = [
    { icon: 'home', text: "Home", path: "/main" },
    {
      icon: 'school',
      text: "Class",
      subMenu: [
        {
          icon: 'chevron_right',
          text: "Word",
          path: "/word",
          activePath: ["/phon", "/alter", "/add"],
        },
        { icon: 'chevron_right', text: "Sentence", path: "/sentence" },
        { icon: 'chevron_right', text: "Grammar", path: "/grammer" },
      ],
    },
    { icon: 'monitoring', text: "Report", path: "/report" },
    { icon: 'sports_esports', text: "Game", path: "/game" },
  ];

  const profileMenu = [
    { icon: <FaUser />, text: "내 프로필", path: "/profile" },
    { icon: <FaCog />, text: "환경설정", path: "/settings" },
    { icon: <FaDownload />, text: "PC 앱 다운로드", path: "/download" },
    { icon: <FaSignOutAlt />, text: "로그아웃", path: "/logout" },
  ];

  return (
    <header className={`header ${isMenuOpen ? "open" : ""}`}>
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
                className={`${isActive ? "active" : ""} ${
                  menu.subMenu ? "has-submenu" : ""
                }`}
                onClick={() =>
                  menu.subMenu
                    ? toggleSubMenu(index)
                    : handleNavigate(menu.path)
                }
              >
                <div
                  className="menu-item"

                >
                  <span className="material-symbols-outlined">{menu.icon}</span>
                  <span className="header-nav-menu-text">{menu.text}</span>
                  {menu.subMenu && (
                    <>
                      <span className="icon submenu-icon">
                        {openSubMenu === index ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                      {!isMenuOpen && (
                        <div className="tooltip">
                          {openSubMenu === index ? "접기" : "펼치기"}
                        </div>
                      )}
                    </>
                  )}
                </div>
                {menu.subMenu && (
                  <div
                    className={`submenu-container ${
                      openSubMenu === index ? "open" : ""
                    }`}
                  >
                    <ul className="submenu">
                      {menu.subMenu.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigate(subItem.path);
                          }}
                          className={
                            location.pathname.startsWith(subItem.path) ||
                            (subItem.activePath &&
                              subItem.activePath.some((path) =>
                                location.pathname.startsWith(path)
                              ))
                              ? "active"
                              : ""
                          }
                        >
                          {isMenuOpen ? (
                            <>
                              <span className="material-symbols-outlined">{subItem.icon}</span>
                              <span className="header-nav-menu-text">
                                {subItem.text}
                              </span>
                            </>
                          ) : (
                            <span className="header-nav-menu-text">
                              {subItem.text.slice(0, 1)}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="header-bottom-wrapper">
        <div className="header-bottom">
          <div className="profile-container" onClick={toggleProfileMenu}>
            <div className="profile-btn">
              <span className="icon">
                <FaUser />
              </span>
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
                    <span className="icon">{menu.icon}</span>
                    <span className="profile-menu-text">{menu.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="header-toggle-btn" onClick={toggleMenu}>
        <span className="icon">
          <FaChevronRight />
        </span>
      </div>
    </header>
  );
};

export default Header;
