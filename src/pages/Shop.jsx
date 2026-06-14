import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../Components/product/ProductGrid';
import FilterSidebar from '../Components/filters/FilterSidebar';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../Components/product/ProductCard';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial values from URL
  const urlQuery = searchParams.get('q') || '';
  const urlCategory = searchParams.get('category') || '';

  const [category, setCategory] = useState(urlCategory);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sort, setSort] = useState('default');
  const [localQuery, setLocalQuery] = useState(urlQuery);
  const [skip, setSkip] = useState(0);
  const limit = 12;
  const [showFilters, setShowFilters] = useState(false);

  const activeQuery = localQuery || urlQuery;

  const { products, loading, error, hasMore } = useProducts({
    category,
    query: activeQuery,
    limit,
    skip,
  });

  // Sync URL when category or query changes (so navbar links update the page)
  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (activeQuery) params.set('q', activeQuery);
    setSearchParams(params, { replace: true });
  }, [category, activeQuery, setSearchParams]);

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
    <div className="max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-white">Shop</h1>
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
              className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 p-4 shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold dark:text-white">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="dark:text-white"
                >
                  ✕
                </button>
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
            <div className="flex-1 flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 gap-2 shadow-sm">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={localQuery}
                onChange={handleQueryChange}
                className="bg-transparent text-sm outline-none w-full text-gray-700 dark:text-gray-200 placeholder-gray-400"
              />
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full px-4 py-2 text-sm shadow-sm border-none"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
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
            <p className="text-center text-gray-400 dark:text-gray-500 text-sm mt-8">
              You've reached the end
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
