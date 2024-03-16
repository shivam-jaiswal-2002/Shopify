// rootofproject/app/cart/page.jsx
"use client";
import React from 'react';
import { useCart } from '../../CartContext';

export const CartPage = () => {
  const { state, incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  // Calculate total price of each type of item
  const calculateTotalPrice = (item) => {
    return (item.price * item.quantity).toFixed(2); // Format to two decimal places
  };

  // Calculate combined total price of all items
  const calculateCombinedTotalPrice = () => {
    return state.cart.reduce((total, item) => total + parseFloat(calculateTotalPrice(item)), 0).toFixed(2); // Format to two decimal places
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-center">Your Cart</h1>
      {state.cart.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty</p>
      ) : (
        <div>
          <ul className="grid gap-4">
            {state.cart.map((item, index) => (
              <li key={index} className="flex items-center bg-white shadow-md p-4 rounded-md">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover mr-4" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <div className="flex items-center">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md mr-2"
                      disabled={item.quantity <= 0} // Disable button when quantity is 0
                    >
                      -
                    </button>
                    <p className="text-gray-600 mr-2">{item.quantity}</p>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-600">Total Price: ${calculateTotalPrice(item)}</p> {/* Display total price */}
                </div>
                <button className="text-red-600 ml-4" onClick={() => removeFromCart(item)}>Remove</button> {/* Remove button */}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-end">
            <p className="text-xl font-semibold">Total: ${calculateCombinedTotalPrice()}</p>
          </div>
        </div>
      )}
    </div>
  );
};
