import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import ProductDetail from '../Components/product/ProductDetail';
import Spinner from '../Components/ui/Spinner';
import { useRecentlyViewed } from '../context/RecentlyViewedContext'; // add this

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addRecentlyViewed } = useRecentlyViewed(); // add this

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then(data => setProduct(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Add to recently viewed when product is loaded
  useEffect(() => {
    if (product && product.id) {
      addRecentlyViewed(product);
    }
  }, [product, addRecentlyViewed]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner size="lg" />
      </div>
    );
  if (error || !product)
    return (
      <div className="text-center py-24 text-gray-500">Product not found.</div>
    );

  return <ProductDetail product={product} />;
}
