"use client";
import React from "react";
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="bg-black font-serif text-white flex justify-between items-center px-4 py-2">
      <Link href="/" className='text-2xl'>
        Shoppers Stop
      </Link>
      <ul className="flex space-x-9">
        <li>
          <Link href="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/categories/mens-clothing">
            Men's Clothing
          </Link>
        </li>
        <li>
          <Link href="/categories/womens-clothing">
            Women's Clothing
          </Link>
        </li>
        <li>
          <Link href="/categories/electronics">
            Electronics
          </Link>
        </li>
        <li>
          <Link href="/categories/jeweleries">
            Jeweleries
          </Link>
        </li>
      </ul>
      {!session ? (
        <>
         <div className="flex space-x-2">
        <Link href="/login">
          <button className="px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-700">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="px-3 py-2 rounded bg-green-500 text-white hover:bg-green-700">
            Signup
          </button>
        </Link>
      </div>
        </>
       
      ):(
        <>
          {session.user?.email}
          <li>
            <button onClick={() => {
              signOut();
            }} className="px-3 py-2 rounded bg-green-500 text-white hover:bg-green-700">Signout</button>
          </li>
        </>
      )}
      
    </nav>
  );
}

export default Navbar;
