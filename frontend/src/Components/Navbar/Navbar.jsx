import { useState, useRef, useContext } from "react";
import React from "react";
import "./Navbar.css";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";
import logo from "../Assets/nav-logo.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img className="logo" src={logo} alt="" />
        </Link>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            Furniture
          </Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        <li
          onClick={() => {
            setMenu("office");
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="office">
            Office
          </Link>
          {menu === "office" ? <hr /> : null}
        </li>
        <li
          onClick={() => {
            setMenu("Kitchenware");
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="Kitchenware"
          >
            Kitchenware
          </Link>
          {menu === "Kitchenware" ? <hr /> : null}
        </li>
        <li
          onClick={() => {
            setMenu("decor");
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/decor">
            Decor
          </Link>
          {menu === "decor" ? <hr /> : null}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
