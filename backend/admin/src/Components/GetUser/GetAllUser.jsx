import React, { useState, useEffect } from 'react';
import './GetAllUser.css';

const GetAllUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchInfo = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await fetch("http://localhost:5000/api/user/all-users", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.status === 403) {
      console.error('Access forbidden: ', response.statusText);
      return;
    }

    const data = await response.json();
    setAllUsers(data.users);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  return (
    <div className='list-user'>
      {selectedUser ? (
        <div className="user-details">
          <button onClick={handleBackClick}>Back</button>
          <h2>User Details</h2>
          <p>Id: {selectedUser.id}</p>
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Phone: {selectedUser.phone}</p>
          <p>Role: {selectedUser.role}</p>
          <div className="cart-items">
            <h3>Cart Items:</h3>
            {selectedUser.cartItems && selectedUser.cartItems.length > 0 ? (
              selectedUser.cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <p>Product ID: {item.product.id}</p>
                  <p>Name : {item.product.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.product.new_price}</p>
                </div>
              ))
            ) : (
              <p>No items in cart</p>
            )}
          </div>
        </div>
      ) : (
        <>
          <h1>All Users:</h1>
          <div className="listuser-format-main">
            <p>Id</p>
            <p>Name</p>
            <p>Email</p>
            <p>Role</p>
          </div>
          {allUsers.map((user) => (
            <div
              key={user.id}
              className="listuser-format-main"
              onClick={() => handleUserClick(user)}
            >
              <p>{user.id}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.role}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default GetAllUser;
