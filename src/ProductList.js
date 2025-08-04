import React, { useState, useMemo } from 'react';
import useIndianProducts from './hooks/useIndianProducts';
import ProductItem from './ProductItem';
import './ProductList.css';

/**
 * ProductList component for displaying and searching Indian products
 * Implements search functionality to filter products
 * Uses custom hook for fetching products with INR pricing
 */
const ProductList = () => {
  const { data: products, loading, error } = useIndianProducts('https://dummyjson.com/products');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    
    return products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [products, searchTerm]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Products</h2>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1>Our Products</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {filteredProducts.length === 0 && searchTerm ? (
        <div className="no-results">
          <h3>No products found</h3>
          <p>Try adjusting your search terms</p>
          <button onClick={() => setSearchTerm('')} className="clear-search-btn">
            Clear Search
          </button>
        </div>
      ) : (
        <>
          <div className="results-info">
            <p>Showing {filteredProducts.length} of {products.length} products</p>
          </div>
          <div className="product-list">
            {filteredProducts.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
