import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ShippingInfo() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-primary text-sm mb-6"
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <h1 className="text-2xl font-bold text-dark mb-4">
        Shipping Information
      </h1>
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4 text-gray-700">
        <p>
          <strong>Last updated:</strong> {new Date().toLocaleDateString()}
        </p>
        <h2 className="font-semibold text-dark mt-4">
          Delivery Options & Costs
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Standard Delivery</strong> (5‑7 business days): $5.99 or
            free on orders over $50
          </li>
          <li>
            <strong>Express Delivery</strong> (2‑3 business days): $12.99
          </li>
          <li>
            <strong>Next Day Delivery</strong> (order before 2pm): $19.99
          </li>
        </ul>
        <h2 className="font-semibold text-dark mt-4">Order Processing Time</h2>
        <p>
          All orders are processed within 1‑2 business days. You'll receive a
          tracking link via email once shipped.
        </p>
        <h2 className="font-semibold text-dark mt-4">International Shipping</h2>
        <p>
          We currently ship to Nigeria, USA, UK, and Canada. International
          delivery takes 7‑14 business days. Customs fees may apply.
        </p>
        <h2 className="font-semibold text-dark mt-4">Lost or Damaged Items</h2>
        <p>
          If your order arrives damaged or is lost, contact us within 7 days at{' '}
          <a href="mailto:support@shopmate.com" className="text-primary">
            support@shopmate.com
          </a>{' '}
          for a replacement or refund.
        </p>
      </div>
    </div>
  );
}
