// components/ProductBanner.js
"use client";
// components/ProductBanner.js

import React, { useEffect, useState } from 'react';
import styles from './ProductBanner.module.css'; // Import CSS module
import Image from 'next/image';

const ProductBanner = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [products.length]);

  return (
    <div className={`px-12 ${styles.productBanner}`}> {/* Apply CSS module */}
      {products.length > 0 && (
        <img
          src={products[currentIndex].image}
          alt={products[currentIndex].title}
          className={`${styles.bannerImage}`}
        />
      )}
    </div>
  );
};

export default ProductBanner;
