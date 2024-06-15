import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import navlogo from '../../assets/nav-logo.png';
import logout from '../../assets/logout.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="navbar">
      <img src={navlogo} className="nav-logo" alt="Navigation Logo" />
      <img src={logout} onClick={handleLogout} className="nav-profile" alt="Logout" />
    </div>
  );
};

export default Navbar;
