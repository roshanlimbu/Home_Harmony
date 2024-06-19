import React, { useState, useEffect, useContext } from "react";
import "./CartItems.css";
import axios from 'axios';
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    const email = localStorage.getItem("auth-email");

    const fetchUser = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/user-details",
          { email },
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
      }
    };
    fetchUser();
  }, []);

  const { totalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  if (!all_product || !all_product.products) {
    return <div>Loading...</div>; // or display a loading indicator
  }

  const handleOrderNow = async () => {
    if (!user) {
      alert("Please log in to place an order");
      return;
    }
    console.log(user);

    const orderItems = all_product.products.filter(p => cartItems[p.id] > 0).map(p => ({
      productId: p.id,
      productName: p.name,
      quantity: cartItems[p.id],
      amount: p.new_price * cartItems[p.id]
    }));

    const totalQuantity = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
    const orderDetails = {
      quantity: totalQuantity,
      amount: totalCartAmount,
      userName: user.name,
      email: user.email,
      phone: user.phone,
      productName: user.cartItems[0].product.name,
      productId: user.cartItems[0].product.id
    };

    // console.log("Order items:", orderItems);

    try {
      const response = await axios.post(
        'http://localhost:5000/orders',
        orderDetails,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        alert("Order placed successfully!");
        navigate('/payment')

      } else {
        console.error("Error placing order:", response);
        alert("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order", error.response ? error.response.data : error.message);
      alert("Failed to place order");
    }
  };

  const helperProduct = all_product.products;
  return (
    <div className="cartitems">
      <div className="cartitems-format-main header">
        <p>Image</p>
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
          <button onClick={handleOrderNow}>Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
