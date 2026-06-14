import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();
const CART_STORAGE_KEY = 'shopmate_cart';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.find(item => item.id === action.payload.id);
      if (exists) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    case 'INCREASE_QTY':
      return state.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case 'DECREASE_QTY':
      return state.map(item =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  // Initialize from localStorage
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Sync to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = product =>
    dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = id =>
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const increaseQty = id => dispatch({ type: 'INCREASE_QTY', payload: id });
  const decreaseQty = id => dispatch({ type: 'DECREASE_QTY', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
