import { Link } from 'react-router-dom';
import { ShoppingBag, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <ShoppingBag size={24} className="text-primary" />
              <span>
                Shop<span className="text-primary">mate</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Your one-stop shop for everything. Quality products, fast
              delivery, and secure payments.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="hover:text-primary transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=smartphones"
                  className="hover:text-primary transition"
                >
                  Smartphones
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=laptops"
                  className="hover:text-primary transition"
                >
                  Laptops
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=fragrances"
                  className="hover:text-primary transition"
                >
                  Fragrances
                </Link>
              </li>
            </ul>
          </div>

          {/* Support - now with correct links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/returns" className="hover:text-primary transition">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-primary transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <a
                  href="mailto:shopmate@gmail.com"
                  className="hover:text-primary transition"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact us */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="flex gap-3">
              <a
                href="mailto:shopmate@gmail.com"
                className="p-2 rounded-full bg-white/10 hover:bg-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-xs text-center text-gray-500">
          © {new Date().getFullYear()} Shopmate. All rights reserved. Built with
          React & Tailwind.
        </div>
      </div>
    </footer>
  );
}
