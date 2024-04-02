import React from 'react'
import { CartPage } from './CartPage/page'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Cart() {
  const session = await getServerSession();
  
  return (
    <div>
    {session ? (
      <CartPage />
    ) : (
      <div className="min-h-screen flex justify-center items-center p-8 bg-gray-100">
  <div className="max-w-md text-center animate-pulse">
    <h1 className="text-4xl font-bold text-black">Please Login to View Cart</h1>
    <button
      className="mt-8 py-2 px-4 bg-blue-900 hover:bg-blue-600 text-white font-bold rounded-md shadow-sm"
    >
      <a href="/login">Login here</a>
    </button>
  </div>
</div>

    )}
  </div>
  )
}


