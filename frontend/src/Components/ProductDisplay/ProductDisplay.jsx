import React from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { useContext } from "react";

const ProductDisplay = (props) => {
  const { product } = props;
  // console.log(product);
  const { addtocart } = useContext(ShopContext);
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productDisplay-img">
          <img
            className="productdisplay-main-img"
            src={`http://localhost:5000/uploads/${product.image}`}
            alt=""
          />
          {/* {console.log()} */}
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            Rs.{product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            Rs.{product.new_price}
          </div>
        </div>
        <button
          onClick={() => {
            addtocart(product.id);
          }}
        >
          ADD TO CART
        </button>
        {/* <div className="productdisplay-right-description"> */}
        {/*   {product.description} */}
        {/* </div> */}

        <p className="productdisplay-right-category">
          <span>Category: </span> {product.category}{" "}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
