import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Payment = () => {
  const [all_product, setAllProduct] = useState({ products: [] });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get(
          "http://localhost:5000/products/all-products",
        );
        setAllProduct(productResponse.data);
        console.log(productResponse.data);
      } catch (error) {
        console.error(
          "Error fetching products or cart data:",
          error.response ? error.response.data : error.message,
        );
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        {all_product.products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.new_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
