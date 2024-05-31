import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import instagram_icon from "../Assets/instagram_icon.png";
import pinterest_icon from "../Assets/pintester_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";
import logo from "../Assets/nav-logo.png";

function Footer() {
  const [activeLink, setActiveLink] = useState(null);

  const renderContent = () => {
    switch (activeLink) {
      case "company":
        return <p>Information about the company.</p>;
      case "offices":
        return <p>Details about our offices.</p>;
      case "aboutus":
        return <p>Learn more about us.</p>;
      case "contact":
        return <p>How to contact us.</p>;
      case "location":
        return <p>Our locations.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="footer">
      <div className="footer-logo">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div>
        <ul className="footer-links">
          <li>
            <Link
              to="#"
              style={{ textDecoration: "none" }}
              onClick={() => setActiveLink("company")}
            >
              Company
            </Link>
          </li>
          <li>
            <Link
              to="#"
              style={{ textDecoration: "none" }}
              onClick={() => setActiveLink("offices")}
            >
              Offices
            </Link>
          </li>
          <li>
            <Link
              to="#"
              style={{ textDecoration: "none" }}
              onClick={() => setActiveLink("aboutus")}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="#"
              style={{ textDecoration: "none" }}
              onClick={() => setActiveLink("contact")}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="#"
              style={{ textDecoration: "none" }}
              onClick={() => setActiveLink("location")}
            >
              Location
            </Link>
          </li>
        </ul>
        <div className="footer-social-icon">
          <div className="footer-icons-container">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagram_icon} alt="Instagram" />
            </a>
          </div>
          <div className="footer-icons-container">
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={pinterest_icon} alt="Pinterest" />
            </a>
          </div>
          <div className="footer-icons-container">
            <a
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={whatsapp_icon} alt="WhatsApp" />
            </a>
          </div>
        </div>
        <div className="footer-content">{renderContent()}</div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
