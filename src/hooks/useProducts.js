import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchProducts,
  fetchProductsByCategory,
  searchProducts,
} from '../services/api';

export const useProducts = ({
  category = '',
  query = '',
  limit = 30,
  skip = 0,
} = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const abortControllerRef = useRef(null);

  const load = useCallback(async () => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      let data;
      if (query) {
        data = await searchProducts(query, { signal: controller.signal });
      } else if (category) {
        data = await fetchProductsByCategory(category, {
          signal: controller.signal,
        });
      } else {
        data = await fetchProducts(limit, skip, { signal: controller.signal });
      }
      const newProducts = data.products ?? [];
      setProducts(prev =>
        skip === 0 ? newProducts : [...prev, ...newProducts]
      );
      setHasMore(newProducts.length === limit);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [category, query, limit, skip]);

  useEffect(() => {
    load();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [load]);

  return { products, loading, error, hasMore };
};
