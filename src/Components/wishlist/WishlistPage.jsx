import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext'; // ← add this
import { formatPrice } from '../../utils/helpers';
import Button from '../ui/Button';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast(); // ← use toast

  const handleAddToCart = product => {
    addToCart(product);
    addToast(`${product.title} added to cart`, 'success');
  };

  const handleRemoveFromWishlist = (productId, productTitle) => {
    removeFromWishlist(productId);
    addToast(`${productTitle} removed from wishlist`, 'info');
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <Heart size={48} className="mx-auto text-gray-200 mb-4" />
        <h2 className="text-xl font-bold text-dark mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Save products you love to revisit later.
        </p>
        <Link to="/shop">
          <Button>Browse Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-dark mb-6">
        Wishlist ({wishlist.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {wishlist.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col"
          >
            <Link
              to={`/product/${product.id}`}
              className="block bg-gray-50 aspect-square overflow-hidden"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={e =>
                  (e.target.src =
                    'https://via.placeholder.com/300?text=No+Image')
                }
              />
            </Link>
            <div className="p-4 flex flex-col flex-1">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-sm font-semibold text-dark hover:text-primary line-clamp-2 mb-2">
                  {product.title}
                </h3>
              </Link>
              <p className="font-bold text-dark mb-4">
                {formatPrice(product.price)}
              </p>
              <div className="flex gap-2 mt-auto">
                <Button
                  size="sm"
                  fullWidth
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    handleRemoveFromWishlist(product.id, product.title)
                  }
                >
                  <Heart size={14} className="fill-red-400 text-red-400" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
