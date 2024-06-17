import { React, useState, useEffect } from 'react'
import './GetOrder.css'
import cross_icon from "../../assets/cross_icon.png";

const GetOrder = () => {
  const [allOrder, setAllOrder] = useState([]);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch("http://localhost:5000/orders");
        const data = await response.json();
        setAllOrder(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrder();
  }, []);



  const removeOrder = async (id) => {
    try {
      await fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setAllOrder(allOrder.filter(order => order.orderId !== id));

    } catch (error) {
      console.error("Error removing order:", error);

    }
  }

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Order Id</p>
        <p>User</p>
        <p>Amount</p>
        <p>Email</p>
        <p>Product</p>
        <p>Quantity</p>
        <p>Phone</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allOrder.map((order, index) => {
          return (
            <div key={index}>
              <div className="listproduct-format-main listproduct-format">
                <p>{order.orderId}</p>
                <p>{order.userName}</p>
                <p>Rs. {order.amount}</p>
                <p>{order.email}</p>
                <p>{order.productName}</p>
                <p>{order.quantity}</p>
                <p>{order.phone}</p>
                <img
                  onClick={() => {
                    removeOrder(order.orderId);
                  }}
                  className="listproduct-remove-icon"
                  src={cross_icon}
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default GetOrder
