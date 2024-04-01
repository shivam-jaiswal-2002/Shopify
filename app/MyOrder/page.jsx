"use client";
// MyOrderPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const session = await getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: session.user.email,
        }),
      });
      const responseData = await response.json();
      setOrders(responseData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Error fetching orders. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">My Orders</h1>
      {loading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : error ? (
        <div className="text-center mt-8 text-red-500">{error}</div>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={order._id} className="bg-white shadow-md rounded-md p-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
              <p className="mb-2">Payment Method: {order.paymentMethod}</p>
              <p className="mb-2">Address: {order.shippingDetails.address}</p>
              <p className="mb-2">User: {order.user}</p>
              <p className="mb-2">Created At: {new Date(order.createdAt).toLocaleString()}</p>
              {/* Render product details if needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrderPage;
