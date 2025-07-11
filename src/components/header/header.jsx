import React, { useEffect, useState } from 'react';
import { FaUser, FaBoxOpen, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../components/Context/CartContext';
import Swal from 'sweetalert2';
import './header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("token"));
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const syncLoginState = () => {
      const token = sessionStorage.getItem("token");
      console.log("Header checking token:", token);

      const loggedIn = !!token;
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        console.log("🔐 Login detected — changing button to Logout.");
      } else {
        console.log("🔓 Logout detected — changing button to Login.");
      }
    };

    syncLoginState(); 
    window.addEventListener("user-auth-changed", syncLoginState);

    return () => {
      window.removeEventListener("user-auth-changed", syncLoginState);
    };
  }, [location]);

  const handleNavigate = () => {
    navigate('/Register');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (searchQuery.trim()) {
        navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.dispatchEvent(new Event("user-auth-changed")); 
        setIsLoggedIn(false);
        Swal.fire('Logged out!', 'You have been successfully logged out.', 'success');
        navigate('/');
      }
    });
  };

  return (
    <div className="header">
      <div className="header-title">
        <Link to="/">Bag It</Link>
      </div>

      <div className="header-search">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="header-actions">
        <div className="dropdown login-dropdown">
          <button className="login-btn">
            {isLoggedIn ? (
              <span onClick={handleLogout}>Logout ▾</span>
            ) : (
              <Link to="/login">Login ▾</Link>
            )}
          </button>

          {isLoggedIn ? (
            <ul className="login-dropdown-menu">
              <li><FaUser className="icon" /><Link to="/Profile"> My Profile</Link></li>
              <li><FaBoxOpen className="icon" /><Link to="/Orders">My Orders</Link></li>
              <li><FaHeart className="icon" /><Link to="/Wishlist"> Wishlist</Link></li>
            </ul>
          ) : (
            <ul className="login-dropdown-menu">
              <li>New customer? <Link to="/login"> Signup</Link></li>
            </ul>
          )}
        </div>

        <button className="cart-btn">
          <Link to="/Cart" className="cart-link">
            <FaShoppingCart className="cart-icon" />
            Cart
            {cartCount > 0 && <span className="cart-count-inline">({cartCount})</span>}
          </Link>
        </button>

        <button onClick={handleNavigate}>Sell your Products</button>
      </div>
    </div>
  );
};

export default Header;
