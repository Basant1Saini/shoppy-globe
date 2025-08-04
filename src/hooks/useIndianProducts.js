import { useState, useEffect } from 'react';
import { convertProductsToIndian } from '../utils/currency';

/**
 * Custom hook for fetching Indian products with INR pricing
 * Converts international products to Indian context
 * @param {string} url - API endpoint URL
 * @returns {object} - Object containing Indian products, loading state, and error state
 */
const useIndianProducts = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIndianProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Handle the DummyJSON API response structure
        let products = [];
        if (result.products && Array.isArray(result.products)) {
          products = result.products;
        } else if (Array.isArray(result)) {
          products = result;
        } else {
          products = [result];
        }
        
        // Convert to Indian products with INR pricing
        const indianProducts = convertProductsToIndian(products);
        
        setData(indianProducts);
      } catch (err) {
        setError(err);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchIndianProducts();
    }
  }, [url]);

  return { data, loading, error };
};

export default useIndianProducts;
