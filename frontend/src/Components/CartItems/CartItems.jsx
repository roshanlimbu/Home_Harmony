import React from "react";
import "./CartItems.css";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { totalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);
  if (!all_product || !all_product.products) {
    return <div>Loading...</div>; // or display a loading indicator
  }

  const handleProceedToCheckout = () => {
    window.location.href = "/payment";
  };
  // console.log(totalCartAmount);
  const helperProduct = all_product.products;
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      {helperProduct.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div>
                <div className="cartitems-format-main">
                  <img
                    src={`http://localhost:5000/uploads/${e.image}`}
                    alt=""
                    className="carticon-product-icon"
                  />
                  <p>{e.name}</p>
                  <p>${e.new_price}</p>
                  <p>{cartItems[e.id]}</p>
                  <p>${e.new_price * cartItems[e.id]}</p>
                  <img
                    className="cartitems-remove-icon"
                    src={remove_icon}
                    onClick={() => {
                      removeFromCart(e.id);
                    }}
                    alt=""
                  />
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals:</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${totalCartAmount.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${totalCartAmount.toFixed(2)}</h3>
            </div>
          </div>
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        {/* <div className="cartitems-promocode"> */}
        {/*   <p>If you have a promo code, Enter it here.</p> */}
        {/*   <div className="cartitems-promobox"> */}
        {/*     <input type="text" placeholder="Promo code" /> */}
        {/*     <button>Submit</button> */}
        {/*   </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CartItems;
