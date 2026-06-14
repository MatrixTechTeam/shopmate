import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function OrderSuccessModal({ isOpen, onClose, orderNumber }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order Confirmed!">
      <div className="text-center">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">Thank you for your purchase!</p>
        <p className="text-sm text-gray-500 mb-4">
          Order #{orderNumber} has been placed successfully.
        </p>
        <div className="flex flex-col gap-2">
          <Link to="/shop" onClick={onClose}>
            <Button variant="primary" fullWidth>
              <ShoppingBag size={16} className="mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <button onClick={onClose} className="text-sm text-primary underline">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
