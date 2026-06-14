import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = e => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      // ✅ Do NOT clear query – keeps the search term visible
      setMenuOpen(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-card"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1 text-lg md:text-xl font-bold"
            aria-label="Shopmate home"
          >
            <ShoppingBag
              className="text-primary"
              size={24}
              aria-hidden="true"
            />
            <span className="text-dark">
              Shop<span className="text-primary">mate</span>
            </span>
          </Link>

          {/* Desktop nav links + category quick links */}
          <div className="hidden md:flex items-center gap-5 text-sm font-medium">
            <Link
              to="/"
              className={`hover:text-primary transition ${location.pathname === '/' ? 'text-primary' : 'text-gray-600'}`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`hover:text-primary transition ${location.pathname === '/shop' ? 'text-primary' : 'text-gray-600'}`}
            >
              Shop
            </Link>
            <div className="flex items-center gap-3 ml-3 pl-3 border-l border-gray-200">
              <Link
                to="/shop?category=smartphones"
                className="text-gray-600 hover:text-primary text-sm"
              >
                Phones
              </Link>
              <Link
                to="/shop?category=laptops"
                className="text-gray-600 hover:text-primary text-sm"
              >
                Laptops
              </Link>
              <Link
                to="/shop?category=fragrances"
                className="text-gray-600 hover:text-primary text-sm"
              >
                Fragrances
              </Link>
              <Link
                to="/shop?category=skincare"
                className="text-gray-600 hover:text-primary text-sm"
              >
                Beauty
              </Link>
            </div>
          </div>

          {/* Desktop search – no double border */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1.5 gap-2 w-80"
          >
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="bg-transparent text-sm outline-none w-full"
              aria-label="Search products"
            />
          </form>

          {/* Icons & Mobile menu button */}
          <div className="flex items-center gap-0.5">
            <Link
              to="/wishlist"
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
              aria-label={`Wishlist (${wishlist.length})`}
            >
              <Heart size={20} className="text-gray-700" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
              aria-label={`Cart (${totalItems})`}
            >
              <ShoppingCart size={20} className="text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onKeyDown={handleKeyDown}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-3 space-y-2 border-t border-gray-100">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2"
            >
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="bg-transparent text-sm outline-none w-full"
              />
            </form>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-primary"
            >
              Shop
            </Link>
            <div className="pt-1 grid grid-cols-2 gap-2 text-sm">
              <Link
                to="/shop?category=smartphones"
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 hover:text-primary"
              >
                Phones
              </Link>
              <Link
                to="/shop?category=laptops"
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 hover:text-primary"
              >
                Laptops
              </Link>
              <Link
                to="/shop?category=fragrances"
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 hover:text-primary"
              >
                Fragrances
              </Link>
              <Link
                to="/shop?category=skincare"
                onClick={() => setMenuOpen(false)}
                className="text-gray-600 hover:text-primary"
              >
                Beauty
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
