import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { addToCart } from './redux/cartSlice';
import Cart from './Cart';

// Create a test store with initial cart items
const createTestStore = (initialItems = []) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: initialItems
      }
    }
  });
  return store;
};

// Test wrapper component
const TestWrapper = ({ children, store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
};

// Mock product for testing
const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 1000,
  thumbnail: 'https://example.com/image.jpg',
  quantity: 2
};

describe('Cart Component', () => {
  test('displays empty cart message when no items', () => {
    const store = createTestStore([]);
    
    render(
      <TestWrapper store={store}>
        <Cart />
      </TestWrapper>
    );

    expect(screen.getByText('Your Cart is Empty')).toBeInTheDocument();
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
  });

  test('displays cart items when items exist', () => {
    const store = createTestStore([mockProduct]);
    
    render(
      <TestWrapper store={store}>
        <Cart />
      </TestWrapper>
    );

    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('2 items')).toBeInTheDocument();
    expect(screen.getByText('Clear Cart')).toBeInTheDocument();
  });

  test('shows correct total calculation', () => {
    const store = createTestStore([mockProduct]);
    
    render(
      <TestWrapper store={store}>
        <Cart />
      </TestWrapper>
    );

    // Subtotal should be 2000 (1000 * 2)
    expect(screen.getByText('₹2,000')).toBeInTheDocument();
    
    // Tax calculation (18% of 2000 = 360)
    expect(screen.getByText('₹360')).toBeInTheDocument();
    
    // Total with tax (2000 + 360 = 2360)
    expect(screen.getByText('₹2,360')).toBeInTheDocument();
  });

  test('clear cart button shows confirmation', () => {
    const store = createTestStore([mockProduct]);
    
    // Mock window.confirm
    window.confirm = jest.fn(() => false);
    
    render(
      <TestWrapper store={store}>
        <Cart />
      </TestWrapper>
    );

    const clearButton = screen.getByText('Clear Cart');
    fireEvent.click(clearButton);
    
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to clear your cart?');
  });

  test('checkout button shows alert', () => {
    const store = createTestStore([mockProduct]);
    
    // Mock window.alert
    window.alert = jest.fn();
    
    render(
      <TestWrapper store={store}>
        <Cart />
      </TestWrapper>
    );

    const checkoutButton = screen.getByText('Proceed to Checkout');
    fireEvent.click(checkoutButton);
    
    expect(window.alert).toHaveBeenCalledWith('Checkout functionality would be implemented here!');
  });

  test('displays free shipping', () => {
    const store = createTestStore([mockProduct]);
    
    render(
      <TestWrapper store={store}>
        <Cart />
      </TestWrapper>
    );

    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  test('displays GST information', () => {
    const store = createTestStore([mockProduct]);
    
    render(
      <TestWrapper store={store}>
        <Cart />
      </TestWrapper>
    );

    expect(screen.getByText('Tax (GST 18%)')).toBeInTheDocument();
  });
});
