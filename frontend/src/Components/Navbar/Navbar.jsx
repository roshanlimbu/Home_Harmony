import { useState } from "react";
import React from "react";
import "./Navbar.css";
// import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);

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
      <ul className="nav-menu">
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
