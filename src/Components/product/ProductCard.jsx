import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice, truncate } from '../../utils/helpers';
import Badge from '../ui/Badge';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const wishlisted = isWishlisted(product.id);
  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart({ ...product, price: discountedPrice });
    addToast(`${product.title} added to cart!`, 'success');
  };

  const handleWishlistToggle = e => {
    e.preventDefault();
    if (wishlisted) {
      removeFromWishlist(product.id);
      addToast(`${product.title} removed from wishlist`, 'info');
    } else {
      addToWishlist(product);
      addToast(`${product.title} added to wishlist`, 'success');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-card hover:shadow-hover transition-shadow duration-200 group flex flex-col border border-gray-100 dark:border-gray-700">
      <Link
        to={`/product/${product.id}`}
        className="relative block overflow-hidden bg-gray-50 dark:bg-gray-700 aspect-square"
        aria-label={`View details of ${product.title}`}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={e =>
            (e.target.src = 'https://via.placeholder.com/300?text=No+Image')
          }
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 left-2">
            <Badge variant="red">
              -{Math.round(product.discountPercentage)}%
            </Badge>
          </div>
        )}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white dark:bg-gray-800 shadow-md hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label={
            wishlisted
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
        >
          <Heart
            size={16}
            className={
              wishlisted
                ? 'fill-primary text-primary'
                : 'text-gray-400 dark:text-gray-500'
            }
            aria-hidden="true"
          />
        </button>
      </Link>

      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-dark dark:text-white hover:text-primary transition-colors leading-tight mb-2 line-clamp-2">
            {truncate(product.title, 50)}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star
            size={14}
            className="fill-yellow-400 text-yellow-400"
            aria-hidden="true"
          />
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            {product.rating?.toFixed(1)}
          </span>
          <span className="text-xs text-gray-300 dark:text-gray-600">·</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {product.stock} left
          </span>
        </div>
        <div className="flex items-center gap-2 mt-auto mb-3">
          <span className="font-bold text-primary text-base">
            {formatPrice(discountedPrice)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full flex items-center justify-center gap-2 text-sm font-semibold py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
            isOutOfStock
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primaryDark active:scale-95'
          }`}
          aria-label={
            isOutOfStock
              ? `${product.title} is out of stock`
              : `Add ${product.title} to cart. Price: ${formatPrice(discountedPrice)}`
          }
        >
          <ShoppingCart size={14} aria-hidden="true" />
          {isOutOfStock ? 'Out of Stock' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}

export default memo(ProductCard);
