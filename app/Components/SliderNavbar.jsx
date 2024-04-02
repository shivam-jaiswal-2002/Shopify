"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import styles from './SliderNavbar.module.css'; // For CSS Modules
import { IoIosMenu } from "react-icons/io";
const SliderNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlider = () => {
    setIsOpen(!isOpen);
  };

  const { data: session } = useSession();

  return (
    <nav className={`${styles.sliderNavbar} ${isOpen ? styles.open : ''}`}>
      <Link href="/" className={styles.logo}>
        TrendHorizon
      </Link>
      <button className={styles.sliderButton} onClick={toggleSlider}>
        <span className={styles.sliderIcon}><IoIosMenu/></span>
      </button>
      <ul className={`${styles.sliderContent} bg-white text-black items-center ${isOpen ? styles.show : ''}`}>
        <li className="px-4 py-2 hover:bg-gray-200">
          <Link href="/Cart">Cart</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200">
          <Link href="/categories/Men">Men&apos;s Clothing</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200">
          <Link href="/categories/Women">Women&apos;s Clothing</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200">
          <Link href="/categories/electronics">Electronics</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200">
          <Link href="/categories/jeweleries">Jeweleries</Link>
        </li>
        {!session ? (
          <>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link href="/login">
                <button className={styles.loginButton}>Login</button>
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link href="/register">
                <button className={styles.signupButton}>Signup</button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link href="/MyOrder">
                <button className={styles.myOrderButton}>My Order</button>
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-200">
              <button className={styles.signOutButton} onClick={() => signOut()}>
                Sign out
              </button>
            </li>
            <li className="px-4 py-2 hover:bg-gray-200">
              <span className={styles.welcomeText}>
                Welcome {session.user.email.split('@')[0]}
              </span>
            </li>
          </>
        )}
        <button className={`${styles.closeButton} absolute top-4 right-4`} onClick={toggleSlider}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
          </svg>
        </button>
      </ul>
    </nav>
  );
};

export default SliderNavbar;
