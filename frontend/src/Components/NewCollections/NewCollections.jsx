import React, { useState, useEffect } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
import axios from "axios";

const NewCollections = () => {
  const [new_collecton, setNew_collection] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/popular/popular")// make the link to new_collection
      .then((response) => {
        setNew_collection(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  return (
    <div className="new-collections">
      <h1>Customize Your Home With Us</h1>
      <hr />
      <div className="collections">
        {new_collecton.map((item, i) => {
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

export default NewCollections;
