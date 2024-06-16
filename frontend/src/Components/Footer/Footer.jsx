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
      case "aboutus":
        return <p>Home Harmony is more than just a store, it's a community passionate about creating beautiful and inspiring living spaces. We are a company driven by the desire to empower individuals to express their unique style through a curated selection of furniture and decor.  Our mission is to simplify the home decor journey by providing exceptional customer service, informative resources, and user-friendly tools to transform your house into a haven you'll love.</p>;
      case "offices":
        return <p>Details about our offices:
          Main Office located at Itahari near Ghorka complex.</p>;
      case "contact":
        return <p>How to contact us.
          Phone no: 9812345678
          Land line: 023-123456</p>;
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
              onClick={() => setActiveLink("aboutus")}
            >
              About Us
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
              onClick={() => setActiveLink("contact")}
            >
              Contact
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
