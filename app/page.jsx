// rootofproject/app/page.js
"use client";
import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className=''>Welcome to Shopify</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 m-2">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-md hover:shadow-2xl transition duration-300">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
            <div className='pt-2'>
              <button>
                <FaShoppingCart size={25}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
