import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from './redux/cartSlice';
import { formatIndianPrice } from './utils/currency';
import './CartItem.css';

/**
 * CartItem component representing a single item in the shopping cart
 * Includes quantity management and remove functionality
 * Optimized with React.memo and useMemo for performance
 * @param {object} item - Cart item data
 */
const CartItem = React.memo(({ item }) => {
  const dispatch = useDispatch();

  // Memoize callback functions to prevent unnecessary re-renders
  const handleRemoveFromCart = useCallback(() => {
    dispatch(removeFromCart(item.id));
  }, [dispatch, item.id]);

  const handleQuantityChange = useCallback((newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  }, [dispatch, item.id]);

  // Memoize calculated values
  const totalPrice = useMemo(() => item.price * item.quantity, [item.price, item.quantity]);
  const formattedItemPrice = useMemo(() => formatIndianPrice(item.price), [item.price]);
  const formattedTotalPrice = useMemo(() => formatIndianPrice(totalPrice), [totalPrice]);

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
        <p className="item-price">{formattedItemPrice}</p>
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
        <p className="total-price">{formattedTotalPrice}</p>
        <button onClick={handleRemoveFromCart} className="remove-btn">
          Remove
        </button>
      </div>
    </div>
  );
});

export default CartItem;
