import { Link } from 'react-router-dom';
import { Home, ShoppingBag } from 'lucide-react';
import Button from '../Components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="text-9xl font-bold text-primary mb-4">404</div>
        <h1 className="text-2xl font-bold text-dark mb-2">Page not found</h1>
        <p className="text-gray-500 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="primary">
              <Home size={16} className="mr-2" />
              Go Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="secondary">
              <ShoppingBag size={16} className="mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
