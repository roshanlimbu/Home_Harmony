import React from "react";
import "./ListProduct.css";
import { useState, useEffect } from "react";
import cross_icon from "../../assets/cross_icon.png";
const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  // console.log(allproducts);
  const fetchInfo = async () => {
    await fetch("http://localhost:5000/products/all-products")
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data.products);
      });
  };
  useEffect(() => {
    fetchInfo();
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
      await fetchInfo();
    } catch (error) {
      console.error("Error removing product:", error);
      // Handle error, show an alert or message to the user
    }
  };

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Image</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <div key={index}>
              <div className="listproduct-format-main listproduct-format">
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt=""
                  className="listproduct-product-icon"
                />
                <p>{product.name}</p>
                <p>Rs. {product.old_price}</p>
                <p>Rs. {product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => {
                    remove_product(product.id);
                  }}
                  className="listproduct-remove-icon"
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
};

export default ListProduct;
