import { X, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import Button from '../ui/Button';
import { formatPrice } from '../../utils/helpers';

export default function CartDrawer({ open, onClose }) {
  const { cart, totalPrice, totalItems } = useCart();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gray-50 z-50 shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2 font-bold text-dark">
            <ShoppingCart size={18} className="text-primary" />
            Cart ({totalItems})
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400 text-sm mt-12">
              Your cart is empty
            </p>
          ) : (
            cart.map(item => <CartItem key={item.id} item={item} />)
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white space-y-3">
            <div className="flex justify-between text-sm font-semibold text-dark">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <Link to="/checkout" onClick={onClose}>
              <Button fullWidth size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
