import React, { useState, useMemo } from 'react';
import useIndianProducts from './hooks/useIndianProducts';
import useDebounce from './hooks/useDebounce';
import ProductItem from './ProductItem';
import LoadingSkeleton from './components/LoadingSkeleton';
import ProductFilter from './components/ProductFilter';
import './ProductList.css';

/**
 * ProductList component for displaying and searching Indian products
 * Implements search functionality to filter products
 * Uses custom hook for fetching products with INR pricing
 */
const ProductList = () => {
  const { data: products, loading, error } = useIndianProducts('https://dummyjson.com/products');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Debounce the search term for better performance
  
  // Filter state
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 10000],
    minRating: 0,
    sortBy: 'default'
  });
  
  // Extract unique categories from products
  const categories = useMemo(() => {
    if (!products.length) return [];
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories.sort();
  }, [products]);

  // Filter and sort products based on search term and filters
  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Apply search filter
    if (debouncedSearchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    // Apply rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(product =>
        product.rating && product.rating >= filters.minRating
      );
    }
    
    // Apply sorting
    if (filters.sortBy !== 'default') {
      filtered = [...filtered].sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating-desc':
            return (b.rating || 0) - (a.rating || 0);
          case 'name-asc':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
    }
    
    return filtered;
  }, [products, debouncedSearchTerm, filters]);

  if (loading) {
    return (
      <div className="product-list-container">
        <div className="product-list-header">
          <h1>Our Products</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              disabled
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
        <LoadingSkeleton count={8} type="product" />
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

      <ProductFilter 
        filters={filters}
        onFilterChange={setFilters}
        categories={categories}
      />
      
      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <h3>No products found</h3>
          <p>Try adjusting your search terms or filters</p>
          <div className="clear-actions">
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="clear-search-btn">
                Clear Search
              </button>
            )}
            {(filters.categories.length > 0 || filters.minRating > 0 || filters.sortBy !== 'default') && (
              <button 
                onClick={() => setFilters({
                  categories: [],
                  priceRange: [0, 10000],
                  minRating: 0,
                  sortBy: 'default'
                })}
                className="clear-filters-btn"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="results-info">
            <p>Showing {filteredProducts.length} of {products.length} products</p>
            {(filters.categories.length > 0 || filters.minRating > 0 || filters.sortBy !== 'default') && (
              <span className="filter-indicator">• Filters applied</span>
            )}
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
