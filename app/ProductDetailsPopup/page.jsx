// ProductDetailsPopup.js
import React from 'react';
import { FaShoppingCart, FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { useCart } from '../CartContext';

const ProductDetailsPopup = ({ product, onClose }) => {
  const { addToCart, incrementQuantity, decrementQuantity, state } = useCart();

  const handleAddToCart = () => {
    if(product.itemsInStock===0){
      alert("item out of stock");
      return;
    }
    addToCart(product);
  };

  const getProductCount = () => {
    const productInCart = state.cart.find(item => item.id === product.id);
    return productInCart ? productInCart.quantity : 0;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg flex relative">
        <button className="absolute top-2 right-2" onClick={onClose}><FaTimes /></button>
        <div className="flex-none mr-8">
          <img src={product.image} alt={product.title} className="w-64 h-auto object-contain" />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
          </div>
          <div className="flex items-center">
            <button onClick={handleAddToCart}>
              <FaShoppingCart size={25} color="green" />
            </button>
            <div className="flex mx-2">
              <button className="mr-1" onClick={() => incrementQuantity(product.id)}><FaPlus /></button>
              <span className="text-xl mr-1">{getProductCount()}</span>
              <button onClick={() => decrementQuantity(product.id)} disabled={getProductCount() === 0}><FaMinus /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPopup;
