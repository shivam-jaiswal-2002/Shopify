"use client"
;import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { CartProvider, useCart } from './CartContext'; // Import removeFromCart
import ProductBanner from './ProductBanner/page';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, incrementQuantity, decrementQuantity,removeFromCart, state } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Fetch products from API
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (product) => {
    const isProductInCart = state.cart.some(item => item.id === product.id);

    if (isProductInCart) {
      removeFromCart(product.id); // Use removeFromCart function
    } else {
      addToCart(product);
    }
  };

  const getProductCount = (productId) => {
    const product = state.cart.find(item => item.id === productId);
    return product ? product.quantity : 0;
  };

  const isProductInCart = (productId) => {
    return state.cart.some(item => item.id === productId);
  };

  return (
    <div className=''>
      <h1 className=' item-center flex text-center text-2xl p-2 m-2 font-serif mb-10 border border-solid border-black'>
        <div className='w-1/2'>
        <ProductBanner/>
        </div>
        <div className='w-1/2 m-auto'>
          Shop From The Best of Best!
        </div>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 m-2">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-md hover:shadow-2xl transition duration-300">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
            <div className='flex mx-2 items-center'>
              <button onClick={() => handleAddToCart(product)}>
                <FaShoppingCart size={25} color={isProductInCart(product.id) ? 'green' : 'black'} />
              </button>
              <div className="flex mx-2">
                <button className='mr-1' onClick={() => incrementQuantity(product.id)}><FaPlus/></button>
                <span className='text-xl mr-1'>{getProductCount(product.id)}</span>
                <button onClick={() => decrementQuantity(product.id)}><FaMinus/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
