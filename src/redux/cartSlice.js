import { createSlice } from '@reduxjs/toolkit';

/**
 * Redux slice for managing shopping cart state
 * Handles adding, removing, and updating quantities of items
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    /**
     * Add item to cart or increment quantity if already exists
     * @param {object} state - Current cart state
     * @param {object} action - Action with product payload
     */
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    
    /**
     * Remove item from cart completely
     * @param {object} state - Current cart state
     * @param {object} action - Action with item id payload
     */
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    
    /**
     * Update quantity of specific item in cart
     * @param {object} state - Current cart state
     * @param {object} action - Action with id and quantity payload
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      }
    },
    
    /**
     * Clear all items from cart
     * @param {object} state - Current cart state
     */
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
