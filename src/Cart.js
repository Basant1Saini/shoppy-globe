import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { clearCart, selectCartTotal, selectCartItemCount } from './redux/cartSlice';
import './Cart.css';

/**
 * Cart component for displaying shopping cart items
 * Shows cart summary, totals, and checkout options
 */
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const cartTotal = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <div className="cart-summary">
          <span className="item-count">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
          <button onClick={handleClearCart} className="clear-cart-btn">
            Clear Cart
          </button>
        </div>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-sidebar">
          <div className="order-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-line">
              <span>Subtotal ({itemCount} items)</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-line">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div className="summary-line">
              <span>Tax</span>
              <span>${(cartTotal * 0.08).toFixed(2)}</span>
            </div>
            
            <hr className="summary-divider" />
            
            <div className="summary-line total-line">
              <span>Total</span>
              <span>${(cartTotal * 1.08).toFixed(2)}</span>
            </div>
            
            <button onClick={handleCheckout} className="checkout-btn">
              Proceed to Checkout
            </button>
            
            <Link to="/" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
