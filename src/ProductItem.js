import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from './redux/cartSlice';
import { formatIndianPrice } from './utils/currency';
import './ProductItem.css';

/**
 * ProductItem component representing a single product
 * Includes product details and Add to Cart functionality
 * @param {object} product - Product data object
 */
const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-item">
      <div className="product-image">
        <img 
          src={product.thumbnail || product.images?.[0] || '/api/placeholder/200/200'} 
          alt={product.title}
          onError={(e) => {
            e.target.src = '/api/placeholder/200/200';
          }}
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">
          {product.description?.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description}
        </p>
        
        <div className="product-details">
          <p className="product-price">{formatIndianPrice(product.price)}</p>
          {product.rating && (
            <p className="product-rating">
              ⭐ {product.rating}
            </p>
          )}
        </div>
        
        <div className="product-actions">
          <Link 
            to={`/product/${product.id}`} 
            className="view-details-btn"
          >
            View Details
          </Link>
          <button 
            onClick={handleAddToCart} 
            className="add-to-cart-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
