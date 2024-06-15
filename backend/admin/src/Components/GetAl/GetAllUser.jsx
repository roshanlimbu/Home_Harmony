import React from 'react'
import { useState, useEffect } from 'react'

const GetAllUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  // console.log(allUsers);
  const fetchUser = async () => {
    await fetch("http://localhost:5000/api/user/all-users")
      .then((response) => response.json())
      .then((data) => {
        setAllUsers(data.user);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='list-product'>

      <h1>All Users</h1>
      <div className="listproduct-format-main">
        <p>id</p>
        <p>name</p>
        <p>email</p>
        <p>password</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allUsers.map((user) => {
          return (
            <div key={index}>
              <div className="listproduct-format-main listproduct-format">
                <p>user.id</p>
                <p>user.name</p>
                <p>user.email</p>
                <p>user.password</p>
              </div>

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default GetAllUser
