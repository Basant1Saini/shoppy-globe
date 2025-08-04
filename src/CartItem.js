import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from './redux/cartSlice';
import { formatIndianPrice } from './utils/currency';
import './CartItem.css';

/**
 * CartItem component representing a single item in the shopping cart
 * Includes quantity management and remove functionality
 * @param {object} item - Cart item data
 */
const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const totalPrice = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="item-image">
        <img 
          src={item.thumbnail || item.images?.[0] || '/api/placeholder/100/100'} 
          alt={item.title}
          onError={(e) => {
            e.target.src = '/api/placeholder/100/100';
          }}
        />
      </div>
      
      <div className="item-details">
        <h4 className="item-title">{item.title}</h4>
        <p className="item-price">{formatIndianPrice(item.price)}</p>
        {item.brand && (
          <p className="item-brand">{item.brand}</p>
        )}
      </div>
      
      <div className="quantity-controls">
        <button 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="quantity-btn"
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="quantity-display">{item.quantity}</span>
        <button 
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="quantity-btn"
        >
          +
        </button>
      </div>
      
      <div className="item-total">
        <p className="total-price">{formatIndianPrice(totalPrice)}</p>
        <button onClick={handleRemoveFromCart} className="remove-btn">
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
