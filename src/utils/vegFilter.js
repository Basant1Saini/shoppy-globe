/**
 * Utility functions for filtering vegetarian products
 */

// List of non-vegetarian keywords to filter out
const NON_VEG_KEYWORDS = [
  'chicken',
  'meat',
  'fish',
  'beef',
  'pork',
  'mutton',
  'lamb',
  'turkey',
  'duck',
  'seafood',
  'prawn',
  'shrimp',
  'crab',
  'lobster',
  'bacon',
  'ham',
  'sausage',
  'pepperoni',
  'salmon',
  'tuna',
  'egg', // If you want to exclude eggs too
];

/**
 * Check if a product is vegetarian based on title and description
 * @param {object} product - Product object
 * @returns {boolean} - True if vegetarian, false if non-vegetarian
 */
export const isVegetarian = (product) => {
  const title = product.title?.toLowerCase() || '';
  const description = product.description?.toLowerCase() || '';
  const category = product.category?.toLowerCase() || '';
  
  // Check if any non-veg keyword is present in title, description, or category
  const containsNonVeg = NON_VEG_KEYWORDS.some(keyword => 
    title.includes(keyword) || 
    description.includes(keyword) || 
    category.includes(keyword)
  );
  
  return !containsNonVeg;
};

/**
 * Filter array of products to include only vegetarian items
 * @param {array} products - Array of products
 * @returns {array} - Array of vegetarian products only
 */
export const filterVegetarianProducts = (products) => {
  return products.filter(isVegetarian);
};

/**
 * Add vegetarian indicator to product
 * @param {object} product - Product object
 * @returns {object} - Product with vegetarian indicator
 */
export const addVegIndicator = (product) => {
  return {
    ...product,
    isVegetarian: isVegetarian(product),
    dietaryInfo: isVegetarian(product) ? 'Vegetarian' : 'Non-Vegetarian'
  };
};
