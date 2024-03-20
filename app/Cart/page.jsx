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
      <p className="text-red-500 font-bold items-center text-center text-4xl mt-40 pt-20">Please login to view cart <a className='text-green-400' href="/login">Login here</a></p>
    )}
  </div>
  )
}


