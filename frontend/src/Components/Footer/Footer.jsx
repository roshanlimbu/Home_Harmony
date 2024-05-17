import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
// import footer_logo from "../Assets/logo_big.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pinterest_icon from "../Assets/pintester_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";
import logo from "../Assets/nav-logo.png"
import { useNavigate } from "react-router-dom";
// import nav_dropdown from "../Assets/.png"


function Footer() {
  return (
    <div className="footer">
      <div className="footer-logo">
        {/* <img src={footer_logo} alt="" /> */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <div>
        <ul className="footer-links">
          <li><Link to="/company" style={{ textDecoration: "none" }}>Company</Link></li>
          <li><Link to="/footeroffice" style={{ textDecoration: "none" }}>Offices</Link></li>
          <li><Link to="/aboutus" style={{ textDecoration: "none" }}>About Us</Link></li>
          <li><Link to="/contact" style={{ textDecoration: "none" }}>Contact</Link></li>
          <li><Link to="/location" style={{ textDecoration: "none" }}>Location</Link></li>
        </ul>
        <div className="footer-social-icon">
          <div className="footer-icons-container">
            <img src={instagram_icon} alt="" />
          </div>
          <div className="footer-icons-container">
            <img src={pinterest_icon} alt="" />
          </div>
          <div className="footer-icons-container">
            <img src={whatsapp_icon} alt="" />
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
