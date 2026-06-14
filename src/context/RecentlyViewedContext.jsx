import { createContext, useContext, useState, useEffect } from 'react';

const RecentlyViewedContext = createContext();
const STORAGE_KEY = 'shopmate_recently_viewed';
const MAX_ITEMS = 5;

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addRecentlyViewed = product => {
    if (!product || !product.id) return;

    setRecentlyViewed(prev => {
      // Remove if already exists (to move to front)
      const filtered = prev.filter(p => p.id !== product.id);
      // Add new product at the beginning, keep only MAX_ITEMS
      return [product, ...filtered].slice(0, MAX_ITEMS);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return (
    <RecentlyViewedContext.Provider
      value={{ recentlyViewed, addRecentlyViewed, clearRecentlyViewed }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);
