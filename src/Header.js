import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

/**
 * Header component with navigation menu and shopping cart icon
 * Displays total number of items in cart
 */
const Header = () => {
  // Get cart items from Redux store to display count
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo/Brand Name */}
        <Link to="/" className="logo">
          <h1>ShoppyGlobe</h1>
        </Link>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            <span className="cart-icon">🛒</span>
            Cart
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
