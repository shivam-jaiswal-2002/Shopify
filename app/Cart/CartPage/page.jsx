"use client";
import React from 'react';
import { useCart } from '../../CartContext';
import { useRouter } from 'next/navigation';
import { usePayment } from '@/app/PaymentContext';

export const CartPage = () => {
  const { state, incrementQuantity, decrementQuantity, removeFromCart } = useCart();
  const { addToPayment } = usePayment(); 
  const router = useRouter();

  const handleCheckout = () => {
    state.cart.forEach((product) => {
      addToPayment({ ...product, quantity: product.quantity });
    });
    router.push('/payment');
  };

  const calculateTotalPrice = (item) => {
    return (item.price * item.quantity).toFixed(2); 
  };

  const calculateCombinedTotalPrice = () => {
    return state.cart.reduce((total, item) => total + parseFloat(calculateTotalPrice(item)), 0).toFixed(2); 
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-center">Your Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {state.cart.length === 0 ? (
          <p className="text-gray-600 text-center col-span-full">Your cart is empty</p>
        ) : (
          <>
            {state.cart.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 flex items-center">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-contain rounded-md mr-4" />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600">Price: ${item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 mr-2 hover:bg-gray-300 transition duration-300"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold mr-2">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button className="text-red-600 ml-4" onClick={() => removeFromCart(item)}>Remove</button> 
                </div>
                <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                  <span className="text-gray-700">Total Price: ${calculateTotalPrice(item)}</span>
                </div>
              </div>
            ))}
            <div className="col-span-full flex justify-end mt-8">
              <p className="text-xl font-semibold mr-10">Total: ${calculateCombinedTotalPrice()}</p>
            </div>
            <div className="col-span-full flex justify-center mt-8">
              <button onClick={handleCheckout} className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
