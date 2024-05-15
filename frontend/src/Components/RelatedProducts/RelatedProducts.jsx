import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import axios from "axios";
import Item from "../Item/Item";
import { useEffect } from "react";

const RelatedProducts = () => {
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/popular/popular")
      .then((response) => {
        setRelatedProduct(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProduct.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
