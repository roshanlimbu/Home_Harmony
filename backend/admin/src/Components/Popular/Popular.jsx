import React from "react";
import axios from "axios";
import "./Popular.css";
import { useState, useEffect } from "react";
import cross_icon from "../../assets/cross_icon.png";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const fetchPopular = async () => {
    try {
      const response = await axios.get("http://localhost:5000/popular/popular");
      setPopular(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching popular items: ", error);
    }
  };
  useEffect(() => {
    fetchPopular();
  }, []);

  const remove_product = async (id) => {
    try {
      await fetch(`http://localhost:5000/products/remove-product/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      await fetchPopular();
    } catch (error) {
      console.error("Error removing product:", error);
      // Handle error, show an alert or message to the user
      alert("Error removing product from popular:", error);
    }
  };

  return (
    <div>
      <div className="popular-product">
        <h1>All Popular List</h1>
        <div className="popularproduct-format-main">
          <p>Image</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="popularproduct-allproducts">
          <hr />
          {popular.map((product, index) => {
            return (
              <div key={index}>
                <div className="popularproduct-format-main listproduct-format">
                  {/* {console.log(product.image)} */}
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt=""
                    className="popularproduct-product-icon"
                  />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p>
                  <img
                    onClick={() => {
                      remove_product(product.id);
                    }}
                    className="popularproduct-remove-icon"
                    src={cross_icon}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
      );
    </div>
  );
};

export default Popular;
