import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primaryDark transition z-40 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
