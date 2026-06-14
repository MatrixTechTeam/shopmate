import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ReturnsPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-primary text-sm mb-6"
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <h1 className="text-2xl font-bold text-dark mb-4">Returns Policy</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4 text-gray-700">
        <p>
          <strong>Last updated:</strong> {new Date().toLocaleDateString()}
        </p>
        <p>
          We want you to be completely satisfied with your purchase. If you're
          not, we're here to help.
        </p>
        <h2 className="font-semibold text-dark mt-4">1. Returns Period</h2>
        <p>
          You have <strong>30 calendar days</strong> from the date you receive
          your item to request a return.
        </p>
        <h2 className="font-semibold text-dark mt-4">2. Eligibility</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Items must be unused, unwashed, and in original packaging.</li>
          <li>Proof of purchase (order number) is required.</li>
          <li>
            Certain items (perishables, personalized goods) are non‑returnable.
          </li>
        </ul>
        <h2 className="font-semibold text-dark mt-4">3. How to Return</h2>
        <p>
          Contact our support team at{' '}
          <a href="mailto:returns@shopmate.com" className="text-primary">
            returns@shopmate.com
          </a>{' '}
          with your order number and reason for return. We'll provide a return
          shipping label.
        </p>
        <h2 className="font-semibold text-dark mt-4">4. Refunds</h2>
        <p>
          Once we receive your return, we'll inspect it and notify you. Approved
          refunds are processed within 5‑7 business days to your original
          payment method.
        </p>
        <h2 className="font-semibold text-dark mt-4">5. Shipping Costs</h2>
        <p>
          Return shipping is free for defective or incorrect items. For other
          returns, the cost is deducted from your refund.
        </p>
      </div>
    </div>
  );
}
