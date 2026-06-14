import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import Navbar from './Components/layout/Navbar';
import Footer from './Components/layout/Footer';
import Spinner from './Components/ui/Spinner';

// Lazy load all page components
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ReturnsPolicy = lazy(() => import('./pages/ReturnsPolicy'));
const ShippingInfo = lazy(() => import('./pages/ShippingInfo'));

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <RecentlyViewedProvider>
            <Router>
              <Navbar />
              <main className="min-h-screen">
                <Suspense
                  fallback={
                    <div className="flex justify-center items-center py-24">
                      <Spinner size="lg" />
                    </div>
                  }
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/returns" element={<ReturnsPolicy />} />
                    <Route path="/shipping" element={<ShippingInfo />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </Router>
          </RecentlyViewedProvider>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
