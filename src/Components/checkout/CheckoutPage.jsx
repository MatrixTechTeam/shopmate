import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import Button from '../ui/Button';
import { CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    card: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!/^\d{16}$/.test(form.card.replace(/\s/g, '')))
      e.card = '16-digit card number required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <CheckCircle size={56} className="mx-auto text-emerald-500 mb-4" />
        <h2 className="text-2xl font-bold text-dark mb-2">Order Placed!</h2>
        <p className="text-gray-500 text-sm mb-6">
          Thanks {form.name}! You'll receive a confirmation at {form.email}.
        </p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <p className="text-gray-400">Your cart is empty.</p>
        <Button className="mt-4" onClick={() => navigate('/shop')}>
          Go Shopping
        </Button>
      </div>
    );
  }

  const field = (name, label, placeholder, type = 'text') => (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={e => {
          setForm(f => ({ ...f, [name]: e.target.value }));
          setErrors(er => ({ ...er, [name]: '' }));
        }}
        className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition-colors ${errors[name] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-primary'}`}
      />
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-dark mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-semibold text-dark mb-4">Shipping Info</h2>
            <div className="space-y-3">
              {field('name', 'Full Name', 'Jane Smith')}
              {field('email', 'Email', 'jane@example.com', 'email')}
              {field('address', 'Address', '123 Main St, City, State')}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h2 className="font-semibold text-dark mb-4">Payment</h2>
            {field('card', 'Card Number', '1234 5678 9012 3456')}
          </div>
        </div>
        <div>
          <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-20">
            <h2 className="font-semibold text-dark mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate pr-2">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="font-medium shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-dark mb-5">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <Button fullWidth size="lg" onClick={handleSubmit}>
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
