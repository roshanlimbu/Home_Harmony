import { useState, useRef, useContext } from "react";
import React from "react";
import "./Navbar.css";
// import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/" style={{ textDecoration: "none" }}>
          {/* <img src={logo} alt="" /> */}
          <p>
            Home <span>Harmony</span>
          </p>
        </Link>
      </div>
      <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            Furniture
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("office");
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="office">
            Office
          </Link>
          {menu === "office" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("Tableware & Kitchenware");
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="Tableware & Kitchenware">
            Tableware & Kitchenware
          </Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("decor");
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/decor">
            Decor
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
