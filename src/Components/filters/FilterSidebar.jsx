import { useState, useEffect } from 'react';
import { fetchCategories } from '../../services/api';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
}) {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(true); // for mobile collapsible

  useEffect(() => {
    fetchCategories()
      .then(cats => setCategories(cats))
      .catch(() => {});
  }, []);

  return (
    <aside className="w-full md:w-64 shrink-0" aria-label="Filter sidebar">
      <div className="bg-white rounded-lg border border-gray-100 shadow-card sticky top-20">
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full md:cursor-default"
            aria-expanded={isOpen}
          >
            <div className="flex items-center gap-2 font-semibold text-dark">
              <SlidersHorizontal
                size={16}
                className="text-primary"
                aria-hidden="true"
              />
              Filters
            </div>
            <ChevronDown
              size={16}
              className={`md:hidden transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {isOpen && (
          <div className="p-4 space-y-6">
            {/* Category filter */}
            <div>
              <h3 className="text-sm font-semibold text-dark mb-2">Category</h3>
              <ul className="space-y-1 max-h-64 overflow-y-auto">
                <li>
                  <button
                    onClick={() => onCategoryChange('')}
                    className={`w-full text-left text-sm px-2 py-1.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                      selectedCategory === ''
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    aria-pressed={selectedCategory === ''}
                  >
                    All
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.slug}>
                    <button
                      onClick={() => onCategoryChange(cat.slug)}
                      className={`w-full text-left text-sm px-2 py-1.5 rounded transition-colors capitalize focus:outline-none focus:ring-2 focus:ring-primary ${
                        selectedCategory === cat.slug
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      aria-pressed={selectedCategory === cat.slug}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price filter */}
            <div>
              <h3 className="text-sm font-semibold text-dark mb-2">
                Max Price
              </h3>
              <input
                type="range"
                min={1}
                max={2000}
                step={10}
                value={priceRange}
                onChange={e => onPriceChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                aria-label="Maximum price filter"
                aria-valuemin={1}
                aria-valuemax={2000}
                aria-valuenow={priceRange}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$1</span>
                <span className="font-medium text-primary">${priceRange}</span>
                <span>$2000</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
