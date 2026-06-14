import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();
const WISHLIST_STORAGE_KEY = 'shopmate_wishlist';

export const WishlistProvider = ({ children }) => {
  // Initialize from localStorage
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = product => {
    setWishlist(prev =>
      prev.find(item => item.id === product.id) ? prev : [...prev, product]
    );
  };
  const removeFromWishlist = id =>
    setWishlist(prev => prev.filter(item => item.id !== id));
  const isWishlisted = id => wishlist.some(item => item.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
