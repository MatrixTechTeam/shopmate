import ProductCard from './ProductCard';

// Skeleton card component for loading state
const SkeletonCard = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-card animate-pulse">
    <div className="aspect-square bg-gray-200"></div>
    <div className="p-3 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="flex gap-1">
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="h-5 bg-gray-200 rounded w-1/2"></div>
      <div className="h-8 bg-gray-200 rounded w-full mt-2"></div>
    </div>
  </div>
);

export default function ProductGrid({ products, loading, error }) {
  if (error) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-lg font-medium text-red-500">Something went wrong</p>
        <p className="text-sm mt-1">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-primary underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading && products.length === 0) {
    // Show 8 skeleton cards while loading initial page
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg font-medium">No products found</p>
        <p className="text-sm mt-1">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
