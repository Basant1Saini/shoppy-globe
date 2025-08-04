import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data from an API
 * @param {string} url - The API endpoint to fetch data from
 * @returns {object} - Object containing data, loading state, and error state
 */
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Handle the DummyJSON API response structure
        if (result.products && Array.isArray(result.products)) {
          setData(result.products);
        } else if (Array.isArray(result)) {
          setData(result);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
