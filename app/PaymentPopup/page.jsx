// Modal.js

import React from "react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <IoCheckmarkDoneCircleSharp className="text-6xl text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-4">Congratulations!</h2>
        <p>Your order has been placed successfully.</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
