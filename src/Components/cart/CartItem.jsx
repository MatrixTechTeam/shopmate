import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/helpers';

export default function CartItem({ item }) {
  const { removeFromCart, increaseQty, decreaseQty } = useCart();
  const { addToast } = useToast();

  const handleRemove = () => {
    removeFromCart(item.id);
    addToast(`${item.title} removed from cart`, 'info');
  };

  return (
    <div className="flex gap-4 items-center bg-white rounded-2xl p-4 shadow-sm">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-16 h-16 object-cover rounded-xl shrink-0 bg-gray-50"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-dark truncate">{item.title}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {formatPrice(item.price)} each
        </p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => decreaseQty(item.id)}
            className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={`Decrease quantity of ${item.title}`}
          >
            <Minus size={12} aria-hidden="true" />
          </button>
          <span
            className="text-sm font-semibold w-6 text-center"
            aria-label={`Quantity: ${item.quantity}`}
          >
            {item.quantity}
          </span>
          <button
            onClick={() => increaseQty(item.id)}
            className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={`Increase quantity of ${item.title}`}
          >
            <Plus size={12} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="font-bold text-dark">
          {formatPrice(item.price * item.quantity)}
        </p>
        <button
          onClick={handleRemove}
          className="mt-2 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={`Remove ${item.title} from cart`}
        >
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
