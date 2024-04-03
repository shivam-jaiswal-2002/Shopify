"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePayment } from "../../PaymentContext";
import PaymentPopup from "../../PaymentPopup/page";
import { useSession } from "next-auth/react";

const PaymentPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { state } = usePayment();
  const [shippingDetails, setShippingDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateTotalPrice = () => {
    return state.products
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handlePaymentDone = async () => {
    const totalPrice = calculateTotalPrice();

    if (totalPrice === "0.00") {
      alert("You don't have anything in your cart.");
      return;
    }

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: session.user.email,
          products: state.products,
          shippingDetails,
          paymentMethod,
        }),
      });
      if (res.ok) {
        setIsModalOpen(true);
      } else {
        console.error("Error processing payment:", res.statusText);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.reload();
    router.push("/Cart");
  };

  return (
    <>
      <div className="container mx-auto p-4 flex justify-center items-center">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold mb-8 text-center">Payment Page</h1>
          <ul className="border border-gray-200 rounded p-8 mb-5">
            {state.products.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-2 m-2 border-b border-gray-200">
                <div className="w-2/3">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div>
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
                </div>
              </li>
            ))}
          </ul>
          <div className="mb-5 text-center">
            <p className="text-xl font-semibold">Total Price: ${calculateTotalPrice()}</p>
          </div>
          {calculateTotalPrice() === "0.00" && (
            <p className="text-red-500 mb-4 text-center">You don&apos;t have anything in your cart.</p>
          )}
          <div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="border border-gray-300 rounded p-3 mb-4 w-full transition-all duration-300 focus:outline-none focus:border-blue-500"
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border border-gray-300 rounded p-3 mb-4 w-full transition-all duration-300 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Payment Method</option>
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
            <button
              onClick={handlePaymentDone}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-black hover:text-white w-full transition-all duration-300 focus:outline-none"
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
      <PaymentPopup isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default PaymentPage;
