import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, RotateCcw } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import ProductGrid from '../Components/product/ProductGrid';
import ProductCard from '../Components/product/ProductCard';

const features = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    desc: 'Same-day dispatch on thousands of products.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    desc: 'Your data is encrypted end-to-end.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: '30-day hassle-free returns, no questions asked.',
  },
];

export default function Home() {
  const { products, loading, error } = useProducts({ limit: 8 });
  const { recentlyViewed } = useRecentlyViewed();

  return (
    <div>
      {/* Jumia Hero Banner */}
      <section className="bg-gradient-to-r from-primary to-primaryDark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Hot Deals
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Up to 70% Off</h1>
          <p className="text-lg mb-6">
            Shop the latest electronics, fashion & more
          </p>
          <Link to="/shop">
            <button className="bg-white text-primary px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition">
              Shop Now →
            </button>
          </Link>
        </div>
      </section>

      {/* Features (optional, keep simple) */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-card"
          >
            <Icon size={24} className="text-primary" />
            <div>
              <h3 className="font-semibold text-dark">{title}</h3>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-dark">Featured Products</h2>
          <Link
            to="/shop"
            className="text-primary text-sm flex items-center gap-1"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <ProductGrid products={products} loading={loading} error={error} />
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold text-dark mb-4">Recently Viewed</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {recentlyViewed.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
