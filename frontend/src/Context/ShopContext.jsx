import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get(
          "http://localhost:5000/products/all-products",
        );
        setAllProduct(productResponse.data);

        if (localStorage.getItem("auth-token")) {
          const cartResponse = await axios.get(
            "http://localhost:5000/getcart",
            {
              headers: {
                "auth-token": localStorage.getItem("auth-token"),
              },
            },
          );
          setCartItems(cartResponse.data);
        }
      } catch (error) {
        console.error(
          "Error fetching products or cart data:",
          error.response ? error.response.data : error.message,
        );
      }
    };

    fetchProducts();
  }, []);

  const addtocart = async (itemId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      updateCartInDatabase(newCartItems, itemId, "add");
      return newCartItems;
    });
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev, [itemId]: (prev[itemId] || 0) - 1 };
      if (newCartItems[itemId] <= 0) {
        delete newCartItems[itemId];
      }
      console.log("Removing item from the cart: ", newCartItems);
      updateCartInDatabase(newCartItems, itemId, "remove");
      return newCartItems;
    });
  };

  const updateCartInDatabase = async (cartData, itemId, action) => {
    try {
      await axios.post(
        "http://localhost:5000/updatecart",
        { cartData, itemId, action },
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {
      console.error(
        "Error updating cart in database:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    if (all_product.length > 0) {
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = all_product.find(
            (product) => product.id === Number(item),
          );
          if (itemInfo) {
            totalAmount += itemInfo.new_price * cartItems[item];
          }
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    getTotalCartItems,
    getTotalCartAmount,
    cartItems,
    addtocart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
