import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';
import { getSessionId } from '../utils/session';
import './Header.css';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const sessionId = getSessionId();
        const response = await api.get(`/cart/${sessionId}`);
        const totalItems = response.data.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
    // Refresh cart count every 2 seconds
    const interval = setInterval(fetchCart, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>ShopOnline</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Trang chủ</Link>
          <Link to="/cart" className="nav-link cart-link">
            Giỏ hàng
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

