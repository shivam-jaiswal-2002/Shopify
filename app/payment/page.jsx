// app/payment/page.jsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePayment } from '../PaymentContext'; // Import usePayment hook
import { useSession } from 'next-auth/react';

const PaymentPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { state } = usePayment(); // Retrieve cart information from PaymentContext
  const [shippingDetails, setShippingDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');

  // Filter out duplicate products based on their IDs
  const uniqueProducts = state.products.reduce((unique, product) => {
    return unique.some((p) => p.id === product.id) ? unique : [...unique, product];
  }, []);

  const handlePaymentDone = async () => {
    try {
      // Send payment data to the server
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user : session.user.email,
          product: uniqueProducts, // Use uniqueProducts instead of state.products
          shippingDetails,
          paymentMethod,
        }),
      });
      if (res.ok) {
        // Redirect to confirmation page
        router.push('/', undefined, { shallow: false });

      } else {
        console.error('Error processing payment:', res.statusText);
        // Handle error
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle error
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-8 text-center">Payment Page</h1>
      {/* Display cart information */}
      <ul className="border border-gray-200 rounded p-4 mb-8">
        {uniqueProducts.map((item) => (
          <li key={item.id} className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">Price: ${item.price}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <div>
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover" />
            </div>
          </li>
        ))}
      </ul>
      {/* Collect shipping details */}
      <input
        type="text"
        name="address"
        placeholder="Address"
        className="border border-gray-300 rounded p-2 mb-4"
        onChange={(e) =>
          setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value })
        }
      />
      {/* Collect payment method */}
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4"
      >
        <option value="">Select Payment Method</option>
        <option value="creditCard">Credit Card</option>
        <option value="paypal">PayPal</option>
      </select>
      {/* Complete payment button */}
      <button
        onClick={handlePaymentDone}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Complete Payment
      </button>
    </div>
  );
};

export default PaymentPage;
