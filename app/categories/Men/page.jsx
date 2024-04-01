// rootofproject/app/page.js
"use client";

import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { CartProvider, useCart } from '../../CartContext';
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import ProductDetailsPopup from '@/app/ProductDetailsPopup/page';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, incrementQuantity, decrementQuantity, state } = useCart(); // Add state and actions from context
  const router = useRouter();

  useEffect(() => {
    // Fetch products from API
    fetch("/api/product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const getProductCount = (productId) => {
    return state.cart.reduce((count, item) => {
      if (item.id === productId) {
        return count + item.quantity;
      }
      return count;
    }, 0);
  };
  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };
  return (
    <div className=''>
    <h1 className='item-center text-center text-2xl p-2 m-2 font-serif'>Shop From The Best of Best!</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 m-2">
      {products.map(product => {
        if (product.category === "men's clothing") {
          return (
            <div key={product.id} className="bg-white p-4 rounded-md hover:shadow-2xl hover:shadow-blue-600 transition duration-300">
              <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4 hover:cursor-pointer" onClick={() => openProductDetails(product)} />
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
              <div className='flex mx-2 items-center'>
                <button onClick={() => handleAddToCart(product)}>
                  <FaShoppingCart size={25} color={state.cart.some(item => item.id === product.id) ? 'green' : 'black'} />
                </button>
                <div className="flex mx-2">
                  <button className='mr-1' onClick={() => incrementQuantity(product.id)}><FaPlus/></button>
                  <span className='text-xl mr-1'>{getProductCount(product.id)}</span>
                  <button onClick={() => decrementQuantity(product.id)}><FaMinus/></button>
                </div>
              </div>
            </div>
          );
        } else {
          return null; // Skip rendering if the category is not electronics
        }
      })}
    </div>
    {/* Product Details Popup */}
    {selectedProduct && (
      <ProductDetailsPopup product={selectedProduct} onClose={closeProductDetails} />
    )}
  </div>
  );
};

export default HomePage;
