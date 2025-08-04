import React, { useState } from 'react';
import './ProductFilter.css';

/**
 * ProductFilter component for advanced product filtering
 * Provides category, price range, and rating filters
 * @param {object} filters - Current filter state
 * @param {function} onFilterChange - Callback when filters change
 * @param {array} categories - Available categories
 */
const ProductFilter = ({ filters, onFilterChange, categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFilterChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handlePriceRangeChange = (range) => {
    onFilterChange({
      ...filters,
      priceRange: range
    });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({
      ...filters,
      minRating: rating
    });
  };

  const handleSortChange = (sortBy) => {
    onFilterChange({
      ...filters,
      sortBy
    });
  };

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      priceRange: [0, 10000],
      minRating: 0,
      sortBy: 'default'
    });
  };

  const priceRanges = [
    { label: 'All Prices', value: [0, 10000] },
    { label: 'Under ₹1,000', value: [0, 1000] },
    { label: '₹1,000 - ₹2,500', value: [1000, 2500] },
    { label: '₹2,500 - ₹5,000', value: [2500, 5000] },
    { label: 'Above ₹5,000', value: [5000, 10000] }
  ];

  const sortOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Rating: High to Low', value: 'rating-desc' },
    { label: 'Name: A to Z', value: 'name-asc' }
  ];

  return (
    <div className="product-filter">
      <div className="filter-header">
        <button 
          className="filter-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>🔍 Filters</span>
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </button>
        {(filters.categories.length > 0 || filters.minRating > 0 || filters.sortBy !== 'default') && (
          <button className="clear-filters" onClick={clearFilters}>
            Clear All
          </button>
        )}
      </div>

      <div className={`filter-content ${isOpen ? 'open' : ''}`}>
        {/* Sort Options */}
        <div className="filter-section">
          <h4>Sort By</h4>
          <select 
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="sort-select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Categories */}
        <div className="filter-section">
          <h4>Categories</h4>
          <div className="category-filters">
            {categories.map(category => (
              <label key={category} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span className="checkbox-label">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="filter-section">
          <h4>Price Range</h4>
          <div className="price-filters">
            {priceRanges.map((range, index) => (
              <label key={index} className="filter-radio">
                <input
                  type="radio"
                  name="priceRange"
                  checked={
                    filters.priceRange[0] === range.value[0] && 
                    filters.priceRange[1] === range.value[1]
                  }
                  onChange={() => handlePriceRangeChange(range.value)}
                />
                <span className="radio-label">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="filter-section">
          <h4>Minimum Rating</h4>
          <div className="rating-filters">
            {[4, 3, 2, 1, 0].map(rating => (
              <label key={rating} className="filter-radio">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() => handleRatingChange(rating)}
                />
                <span className="radio-label">
                  {rating === 0 ? 'All Ratings' : `${rating}+ Stars`}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
