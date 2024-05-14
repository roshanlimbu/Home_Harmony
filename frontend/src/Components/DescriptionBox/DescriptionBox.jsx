import React from "react";
import "./DescriptionBox.css";
import { ShopContext } from "../../Context/ShopContext";
import { useContext } from "react";
const DescriptionBox = (props) => {
  const { product } = props;
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
      </div>
      <div className="descriptionbox-description">
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default DescriptionBox;
