import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState({ products: [] });
  const [cartItems, setCartItems] = useState({});
  const [totalCartAmount, setTotalCartAmount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get(
          "http://localhost:5000/products/all-products",
        );
        // console.log("Product response data:", productResponse.data);
        setAllProduct(productResponse.data); // Ensure this is an array

        if (localStorage.getItem("auth-token")) {
          const cartResponse = await axios.get(
            "http://localhost:5000/getcart",
            {
              headers: {
                "auth-token": localStorage.getItem("auth-token"),
              },
            },
          );
          // console.log("Cart response data:", cartResponse.data);
          setCartItems(cartResponse.data); // Ensure this is an object with item IDs as keys
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

  useEffect(() => {
    const calculateTotalCartAmount = () => {
      let totalAmount = 0;
      if (
        Array.isArray(all_product.products) &&
        all_product.products.length > 0
      ) {
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = all_product.products.find(
              (product) => product.id === Number(item),
            );
            if (itemInfo) {
              totalAmount += itemInfo.new_price * cartItems[item];
              // console.log(
              //   `Adding ${itemInfo.new_price} * ${cartItems[item]} for item ${item}`,
              // );
            } else {
              console.log(`Item info not found for item id ${item}`);
            }
          } else {
            console.log(`Item ${item} has quantity 0`);
          }
        }
      }
      // console.log("Total amount calculated:", totalAmount);
      // console.log("Number of products:", all_product.products.length);
      setTotalCartAmount(totalAmount);
    };

    calculateTotalCartAmount();
  }, [all_product, cartItems]);

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
      console.log("Removing item from the cart:", newCartItems);
      updateCartInDatabase(newCartItems, itemId, "remove");
      return newCartItems;
    });
  };

  const updateCartInDatabase = async (cartData, itemId, action) => {
    try {
      console.log("Updating cart in database:", { cartData, itemId, action });
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
    totalCartAmount,
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
