import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import CartItem from '../Components/cart/CartItem';
import Button from '../Components/ui/Button';
import { formatPrice } from '../utils/helpers';

export default function CartPage() {
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const { addToast } = useToast();

  const handleClearCart = () => {
    clearCart();
    addToast('Cart cleared', 'warning');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <ShoppingCart
          size={48}
          className="mx-auto text-gray-200 dark:text-gray-700 mb-4"
        />
        <h2 className="text-xl font-bold text-dark dark:text-white mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">
          Add some items from the shop to get started.
        </p>
        <Link to="/shop">
          <Button>Go Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-dark dark:text-white">
          Cart ({totalItems})
        </h1>
        <button
          onClick={handleClearCart}
          className="text-xs text-red-400 hover:text-red-600 transition-colors"
        >
          Clear all
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-3">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm sticky top-20">
            <h2 className="font-semibold text-dark dark:text-white mb-4">
              Order Summary
            </h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Shipping</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  Free
                </span>
              </div>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between font-bold text-dark dark:text-white mb-5">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <Link to="/checkout">
              <Button fullWidth size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
