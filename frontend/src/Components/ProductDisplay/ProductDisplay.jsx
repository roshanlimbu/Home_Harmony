import React from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { useContext } from "react";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addtocart } = useContext(ShopContext);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 0; i < totalStars; i++) {
      if (i < rating) {
        stars.push(<img key={i} src={star_icon} alt="star" />);
      } else {
        stars.push(<img key={i} src={star_dull_icon} alt="dull star" />);
      }
    }
    return stars;
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productDisplay-img">
          <img
            className="productdisplay-main-img"
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          {renderStars(product.rating)}
          <p>({product.reviewsCount})</p>
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
        <p className="productdisplay-right-category">
          <span>Category: </span> {product.category}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
