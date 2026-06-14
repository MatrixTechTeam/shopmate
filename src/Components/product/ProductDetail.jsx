import { useState } from 'react';
import {
  Star,
  ShoppingCart,
  Heart,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/helpers';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const [imgIdx, setImgIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const images = product.images?.length ? product.images : [product.thumbnail];
  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  const handleAddToCart = () => {
    addToCart({ ...product, price: discountedPrice });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square mb-3">
            <img
              src={images[imgIdx]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setImgIdx(i => (i - 1 + images.length) % images.length)
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow hover:bg-gray-100"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setImgIdx(i => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-1.5 shadow hover:bg-gray-100"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-colors ${i === imgIdx ? 'border-primary' : 'border-transparent'}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h1 className="text-2xl font-bold text-dark mb-2">{product.title}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map(s => (
                <Star
                  key={s}
                  size={14}
                  className={
                    s <= Math.round(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-200 fill-gray-200'
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating?.toFixed(1)}
            </span>
            <span className="text-gray-300">·</span>
            {product.stock > 0 ? (
              <Badge variant="green">{product.stock} in stock</Badge>
            ) : (
              <Badge variant="red">Out of stock</Badge>
            )}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-dark">
              {formatPrice(discountedPrice)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-gray-400 line-through text-lg">
                  {formatPrice(product.price)}
                </span>
                <Badge variant="red">
                  -{Math.round(product.discountPercentage)}%
                </Badge>
              </>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex flex-col gap-3 mt-auto">
            <Button
              fullWidth
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={18} />
              {added ? 'Added!' : 'Add to Cart'}
            </Button>
            <Button
              variant="secondary"
              fullWidth
              size="lg"
              onClick={() =>
                wishlisted
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product)
              }
            >
              <Heart
                size={18}
                className={wishlisted ? 'fill-red-500 text-red-500' : ''}
              />
              {wishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
            </Button>
          </div>

          {product.brand && (
            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-400">Brand</span>
                <p className="font-medium text-dark mt-0.5">{product.brand}</p>
              </div>
              <div>
                <span className="text-gray-400">SKU</span>
                <p className="font-medium text-dark mt-0.5">{product.sku}</p>
              </div>
              {product.warrantyInformation && (
                <div className="col-span-2">
                  <span className="text-gray-400">Warranty</span>
                  <p className="font-medium text-dark mt-0.5">
                    {product.warrantyInformation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      {product.reviews?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold text-dark mb-4">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-dark">
                    {review.reviewerName}
                  </span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star
                        key={s}
                        size={12}
                        className={
                          s <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-200 fill-gray-200'
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {review.comment}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
