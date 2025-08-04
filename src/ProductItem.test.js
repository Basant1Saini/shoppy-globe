import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './redux/cartSlice';
import ProductItem from './ProductItem';

// Mock product data for testing
const mockProduct = {
  id: 1,
  title: 'Test Product',
  description: 'This is a test product description',
  price: 999,
  thumbnail: 'https://example.com/image.jpg',
  rating: 4.5,
  isVegetarian: true
};

// Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
};

// Test wrapper component
const TestWrapper = ({ children }) => {
  const store = createTestStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
};

describe('ProductItem Component', () => {
  test('renders product information correctly', () => {
    render(
      <TestWrapper>
        <ProductItem product={mockProduct} />
      </TestWrapper>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText(/This is a test product description/)).toBeInTheDocument();
    expect(screen.getByText('₹999')).toBeInTheDocument();
    expect(screen.getByText('⭐ 4.5')).toBeInTheDocument();
  });

  test('shows vegetarian indicator for vegetarian products', () => {
    render(
      <TestWrapper>
        <ProductItem product={mockProduct} />
      </TestWrapper>
    );

    const vegIndicator = screen.getByTitle('Vegetarian Product');
    expect(vegIndicator).toBeInTheDocument();
  });

  test('add to cart button works', () => {
    render(
      <TestWrapper>
        <ProductItem product={mockProduct} />
      </TestWrapper>
    );

    const addToCartButton = screen.getByText('Add to Cart');
    expect(addToCartButton).toBeInTheDocument();
    
    fireEvent.click(addToCartButton);
    // The button should still be present after clicking
    expect(addToCartButton).toBeInTheDocument();
  });

  test('view details link points to correct product page', () => {
    render(
      <TestWrapper>
        <ProductItem product={mockProduct} />
      </TestWrapper>
    );

    const viewDetailsLink = screen.getByText('View Details');
    expect(viewDetailsLink).toBeInTheDocument();
    expect(viewDetailsLink.getAttribute('href')).toBe('/product/1');
  });

  test('handles missing product data gracefully', () => {
    const incompleteProduct = {
      id: 2,
      title: 'Incomplete Product',
      price: 500
    };

    render(
      <TestWrapper>
        <ProductItem product={incompleteProduct} />
      </TestWrapper>
    );

    expect(screen.getByText('Incomplete Product')).toBeInTheDocument();
    expect(screen.getByText('₹500')).toBeInTheDocument();
    // Rating should not be displayed if not present
    expect(screen.queryByText(/⭐/)).not.toBeInTheDocument();
  });
});
