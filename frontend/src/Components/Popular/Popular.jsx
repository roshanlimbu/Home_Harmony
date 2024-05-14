import React, { useState, useEffect } from "react";
import "./Popular.css";
import Item from "../Item/Item";
import axios from "axios";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/popular/popular")
      .then((response) => {
        setPopularProducts(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="popular">
      <h1>POPULAR NOW</h1>
      <hr />
      <div className="popular-item">
        {/* {console.log(popularProducts)} */}
        {popularProducts.map((item, i) => {
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

export default Popular;
