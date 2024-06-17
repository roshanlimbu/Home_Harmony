import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icons from "../../assets/Product_list_icon.svg";
import popularity_icon from "../../assets/popularity.png";
import newCollection_icon from "../../assets/new-product.png";
import users from '../../assets/group.png'
import order from '../../assets/order.png'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/dashboard/addproduct" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to="/dashboard/listproduct" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icons} />
          <p>Product List</p>
        </div>
      </Link>
      <Link to="/dashboard/popular" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={popularity_icon} />
          <p>Popular Items</p>
        </div>
      </Link>
      <Link to="/dashboard/newcollection" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={newCollection_icon} />
          <p>New Collection</p>
        </div>
      </Link>

      <Link to="/dashboard/getalluser" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={users} />
          <p>Get All User </p>
        </div>
      </Link>
      <Link to="/dashboard/getallorder" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={order} />
          <p>Get All Orders </p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
