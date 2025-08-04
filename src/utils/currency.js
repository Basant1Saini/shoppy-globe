/**
 * Currency conversion and formatting utilities for Indian market
 */

// Mock exchange rate (1 USD = 83 INR approximately)
const USD_TO_INR_RATE = 83;

/**
 * Convert USD to INR
 * @param {number} usdAmount - Amount in USD
 * @returns {number} Amount in INR
 */
export const convertUSDToINR = (usdAmount) => {
  return Math.round(usdAmount * USD_TO_INR_RATE);
};

/**
 * Format price with Indian Rupee symbol
 * @param {number} amount - Amount in INR
 * @returns {string} Formatted price string
 */
export const formatIndianPrice = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

/**
 * Convert product data to Indian context
 * @param {object} product - Original product data
 * @returns {object} Product with Indian pricing and context
 */
export const convertToIndianProduct = (product) => {
  const indianPrice = convertUSDToINR(product.price);
  
  return {
    ...product,
    originalPrice: product.price,
    price: indianPrice,
    formattedPrice: formatIndianPrice(indianPrice),
    currency: 'INR',
    region: 'India'
  };
};

/**
 * Convert multiple products to Indian context
 * @param {array} products - Array of products
 * @returns {array} Array of products with Indian pricing
 */
export const convertProductsToIndian = (products) => {
  return products.map(convertToIndianProduct);
};
