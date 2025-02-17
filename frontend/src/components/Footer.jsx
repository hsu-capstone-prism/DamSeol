import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <nav>
          <ul className="footer-nav">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/admin">Admin Page</Link>
            </li>
          </ul>
        </nav>
        <p>&copy; {new Date().getFullYear()} Apporium. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
