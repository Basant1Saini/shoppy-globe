import React from 'react';
import './LoadingSkeleton.css';

/**
 * LoadingSkeleton component to show placeholder content while data loads
 * Provides better user experience than simple loading spinners
 * @param {number} count - Number of skeleton items to show
 * @param {string} type - Type of skeleton (product, cart-item, detail)
 */
const LoadingSkeleton = ({ count = 6, type = 'product' }) => {
  const skeletonItems = Array.from({ length: count }, (_, index) => index);

  if (type === 'product') {
    return (
      <div className="skeleton-container">
        {skeletonItems.map((item) => (
          <div key={item} className="skeleton-product">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-description"></div>
              <div className="skeleton-price"></div>
              <div className="skeleton-buttons">
                <div className="skeleton-button"></div>
                <div className="skeleton-button"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'cart-item') {
    return (
      <div className="skeleton-cart-container">
        {skeletonItems.map((item) => (
          <div key={item} className="skeleton-cart-item">
            <div className="skeleton-cart-image"></div>
            <div className="skeleton-cart-details">
              <div className="skeleton-cart-title"></div>
              <div className="skeleton-cart-price"></div>
            </div>
            <div className="skeleton-cart-controls">
              <div className="skeleton-quantity-controls"></div>
              <div className="skeleton-cart-button"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="skeleton-detail">
        <div className="skeleton-detail-images">
          <div className="skeleton-main-image"></div>
          <div className="skeleton-thumbnails">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="skeleton-thumbnail"></div>
            ))}
          </div>
        </div>
        <div className="skeleton-detail-info">
          <div className="skeleton-detail-title"></div>
          <div className="skeleton-detail-meta"></div>
          <div className="skeleton-detail-description"></div>
          <div className="skeleton-detail-price"></div>
          <div className="skeleton-detail-buttons">
            <div className="skeleton-button large"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
