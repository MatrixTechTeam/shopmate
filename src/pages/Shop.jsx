import { useState, useMemo, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../Components/product/ProductGrid';
import FilterSidebar from '../Components/filters/FilterSidebar';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../Components/product/ProductCard'; // needed for ref

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sort, setSort] = useState('default');
  const [localQuery, setLocalQuery] = useState('');
  const [skip, setSkip] = useState(0);
  const limit = 12;
  const [showFilters, setShowFilters] = useState(false);

  const urlQuery = searchParams.get('q') || '';
  const activeQuery = localQuery || urlQuery;

  const { products, loading, error, hasMore } = useProducts({
    category,
    query: activeQuery,
    limit,
    skip,
  });

  const filtered = useMemo(() => {
    let p = products.filter(x => x.price <= maxPrice);
    if (sort === 'price-asc') p.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') p.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') p.sort((a, b) => b.rating - a.rating);
    return p;
  }, [products, maxPrice, sort]);

  const resetPagination = () => setSkip(0);

  const handleCategoryChange = cat => {
    setCategory(cat);
    resetPagination();
  };
  const handlePriceChange = price => {
    setMaxPrice(price);
    resetPagination();
  };
  const handleQueryChange = e => {
    setLocalQuery(e.target.value);
    resetPagination();
  };

  // Infinite scroll observer
  const observerRef = useRef();
  const lastProductRef = useCallback(
    node => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setSkip(prev => prev + limit);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, limit]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Shop</h1>
        <button
          onClick={() => setShowFilters(true)}
          className="md:hidden flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-full text-sm"
        >
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <FilterSidebar
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
            priceRange={maxPrice}
            onPriceChange={handlePriceChange}
          />
        </div>

        {/* Mobile filter drawer */}
        {showFilters && (
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setShowFilters(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-80 bg-white p-4 shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold">Filters</h2>
                <button onClick={() => setShowFilters(false)}>✕</button>
              </div>
              <FilterSidebar
                selectedCategory={category}
                onCategoryChange={cat => {
                  handleCategoryChange(cat);
                  setShowFilters(false);
                }}
                priceRange={maxPrice}
                onPriceChange={handlePriceChange}
              />
            </div>
          </div>
        )}

        {/* Products area */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 flex items-center bg-white rounded-full px-4 py-2 gap-2 shadow-sm">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={localQuery}
                onChange={handleQueryChange}
                className="bg-transparent text-sm outline-none w-full"
              />
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-white rounded-full px-4 py-2 text-sm shadow-sm"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <p className="text-xs text-gray-500 mb-3">
            {filtered.length} products
          </p>

          {/* Custom grid with last item ref */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {filtered.map((product, index) => (
              <div
                key={product.id}
                ref={index === filtered.length - 1 ? lastProductRef : null}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {loading && (
            <div className="flex justify-center mt-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          {!hasMore && filtered.length > 0 && (
            <p className="text-center text-gray-400 text-sm mt-8">
              You've reached the end
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
