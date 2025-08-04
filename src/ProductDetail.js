import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/cartSlice';
import './ProductDetail.css';

/**
 * ProductDetail component for displaying detailed product information
 * Fetches product data based on route parameters
 * @returns {JSX.Element} Product detail page
 */
const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error);
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Product</h2>
        <p>{error.message}</p>
        <Link to="/" className="back-btn">Back to Products</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <Link to="/" className="back-btn">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span> / </span>
          <span>{product.category}</span>
          <span> / </span>
          <span>{product.title}</span>
        </nav>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={product.images?.[selectedImage] || product.thumbnail || '/api/placeholder/400/400'} 
                alt={product.title}
                onError={(e) => {
                  e.target.src = '/api/placeholder/400/400';
                }}
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${product.title} ${index + 1}`}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                    onError={(e) => {
                      e.target.src = '/api/placeholder/100/100';
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            
            <div className="product-meta">
              <span className="product-brand">{product.brand}</span>
              <span className="product-category">{product.category}</span>
            </div>

            {product.rating && (
              <div className="product-rating">
                <span className="stars">⭐ {product.rating}</span>
                <span className="rating-text">({product.rating}/5)</span>
              </div>
            )}

            <p className="product-description">{product.description}</p>

            <div className="product-pricing">
              <span className="current-price">${product.price}</span>
              {product.discountPercentage && (
                <>
                  <span className="original-price">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                  <span className="discount">{product.discountPercentage}% off</span>
                </>
              )}
            </div>

            {product.stock && (
              <div className="stock-info">
                <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
            )}

            <div className="product-actions">
              <button 
                onClick={handleAddToCart} 
                className="add-to-cart-btn"
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              <Link to="/" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
