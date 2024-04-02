import React, { useEffect } from "react";
import { FaShoppingCart, FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { useCart } from "../CartContext";

const ProductDetailsPopup = ({ product, onClose }) => {
  const { addToCart, incrementQuantity, decrementQuantity, state } = useCart();

  const handleAddToCart = () => {
    if (product.itemsInStock === 0) {
      alert("Item out of stock");
      return;
    }
    addToCart(product);
  };

  const getProductCount = () => {
    const productInCart = state.cart.find((item) => item.id === product.id);
    return productInCart ? productInCart.quantity : 0;
  };

  const handleCloseOnOutsideClick = (e) => {
    if (!e.target.closest(".popup-container")) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleCloseOnOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleCloseOnOutsideClick);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center p-5 items-center bg-black bg-opacity-50">
      <div className="popup-container bg-white p-8 rounded-lg flex relative shadow-lg hover:shadow-blue-800 transform scale-100 hover:scale-105 transition-transform duration-300">
        <button className="absolute top-2 right-10" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="flex-none mr-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-64 h-auto object-contain"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">${product.price}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 rounded-md bg-blue-900 text-white"
            >
              <FaShoppingCart size={25} />
            </button>
            <div className="flex mx-2">
              <button
                onClick={() => decrementQuantity(product.id)}
                disabled={getProductCount() === 0}
                className="px-4 py-2 rounded-md bg-red-500 text-white"
              >
                <FaMinus />
              </button>

              <span className="text-xl mx-2">{getProductCount()}</span>
              <button
                onClick={() => incrementQuantity(product.id)}
                className="px-4 py-2 rounded-md bg-blue-500 text-white"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPopup;
