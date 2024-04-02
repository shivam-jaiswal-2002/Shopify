"use client";
// PaymentPage.jsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePayment } from "../../PaymentContext"; // Import usePayment hook
import { useSession } from "next-auth/react";
import PaymentPopup from "../../PaymentPopup/page"


export const PaymentPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { state } = usePayment(); // Retrieve cart information from PaymentContext
  const [shippingDetails, setShippingDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Function to calculate the total price
  const calculateTotalPrice = () => {
    return uniqueProducts
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Filter out duplicate products based on their IDs
  const uniqueProducts = state.products.reduce((unique, product) => {
    return unique.some((p) => p.id === product.id)
      ? unique
      : [...unique, product];
  }, []);

  const handlePaymentDone = async () => {
    const totalPrice = calculateTotalPrice();

    if (totalPrice === "0.00") {
      alert("You don't have anything in your cart.");
      return;
  }

    try {
      // Send payment data to the server
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: session.user.email,
          products: uniqueProducts, // Use uniqueProducts instead of state.products
          shippingDetails,
          paymentMethod,
        }),
      });
      if (res.ok) {
        // Redirect to confirmation page
        setIsModalOpen(true);
      } else {
        console.error("Error processing payment:", res.statusText);
        // Handle error
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle error
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.reload();
    window.onload = () => {
      router.push("/Cart");
    };
  };
  
  return (
    <>
      <div className="container mx-auto p-4 flex justify-center items-center">
        <div className="max-w-lg w-full">
          <h1 className="text-3xl font-semibold mb-8 text-center">
            Payment Page
          </h1>
          {/* Display cart information */}
          <ul className="border border-gray-200 rounded p-8 mb-5">
            {uniqueProducts.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-2 m-2"
              >
                <div className="w-2/3">
                  {" "}
                  {/* Increase width of product details */}
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </li>
            ))}
          </ul>
          {/* Total price */}
          <div className="mb-5 text-center">
            <p className="text-xl font-semibold">
              Total Price: ${calculateTotalPrice()}
            </p>
          </div>
          {/* Error message for zero total price */}
          {calculateTotalPrice() === "0.00" && (
            <p className="text-red-500 mb-4 text-center">
              You don&apos;t have anything in your cart.
            </p>
          )}
          {/* Collect shipping details */}
          <div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="border border-gray-300 rounded p-2 mb-4 w-full"
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {/* Collect payment method */}
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
            >
              <option value="">Select Payment Method</option>
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
            {/* Complete payment button */}
            <button
              onClick={handlePaymentDone}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-black hover:text-white w-full"
            >
              Complete Payment
            </button>
          </div>
        </div>
        {/* Modal for showing order confirmation */}
      <PaymentPopup isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
};

export default PaymentPage;
