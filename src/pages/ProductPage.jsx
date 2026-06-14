import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import ProductDetail from '../Components/product/ProductDetail';
import Spinner from '../Components/ui/Spinner';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import NotFound from './NotFound'; // import 404 page

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then(data => setProduct(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (product && product.id) {
      addRecentlyViewed(product);
    }
  }, [product, addRecentlyViewed]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  // Show 404 page if product not found or error
  if (error || !product) {
    return <NotFound />;
  }

  return <ProductDetail product={product} />;
}
