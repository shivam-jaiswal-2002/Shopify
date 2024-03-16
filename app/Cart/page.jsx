import React from 'react'
import { CartPage } from './CartPage/page'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Cart() {
  const session = await getServerSession();
  if(!session){
    console.log("sesssion doesnt exist")
    redirect("/");
  }
  else{
    console.log("sesssion exists");
  }

  return (
    (session &&
      <div>
      <CartPage/>
    </div>
      )    
  )
}


