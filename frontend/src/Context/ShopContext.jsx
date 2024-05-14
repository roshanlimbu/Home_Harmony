import React, { createContext } from "react";
import { useState, useEffect } from "react";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/products/all-products",
        );
        const data = await response.json();
        setAllProduct(data);
        if (localStorage.getItem("auth-token")) {
          fetch("http://localhost:5000/getcart", {
            method: "POST",
            headers: {
              Accept: "application/form-data",
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cart: cartItems }),
          }).then((response) =>
            response.json().then((data) => setCartItems(data)),
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // console.log("all_product:", all_product);
  // const addToCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  //   if (localStorage.getItem("auth-token")) {
  //     fetch("http://localhost:5000/addtocart", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/form-data",
  //         "auth-token": `${localStorage.getItem("auth-token")}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ itemId: itemId }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => console.log(data));
  //   }
  // };
  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  // };

  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  //   if (localStorage.getItem("auth-token")) {
  //     fetch("http://localhost:5000/removefromcart", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "auth-token": `${localStorage.getItem("auth-token")}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ itemId: itemId }),
  //     }).then((response) => response.json());
  //   }
  // };

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   if (all_product.length > 0) {
  //     for (const item in cartItems) {
  //       if (cartItems[item] > 0) {
  //         let itemInfo = all_product.find(
  //           (product) => product.id === Number(item),
  //         );
  //         totalAmount += itemInfo.new_price * cartItems[item];
  //       }
  //     }
  //   }
  //   return totalAmount;
  // };
  // const getTotalCartItems = () => {
  //   let totalItem = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       totalItem += cartItems[item];
  //     }
  //   }
  //   return totalItem;
  // };
  //
  const contextValue = {
    all_product,
    // getTotalCartItems,
    // getTotalCartAmount,
    // cartItems,
    // addToCart,
    // removeFromCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
