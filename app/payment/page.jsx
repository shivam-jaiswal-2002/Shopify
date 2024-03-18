import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import PaymentPage from './PaymentPage/page';
export default async function page() {
  const session = await getServerSession();
  if(!session){
    console.log("sesssion doesnt exist")
    redirect("/");
  }
  else{
    console.log("sesssion exists");
  }

  return (
    <div>
      <PaymentPage />
    </div>

  )
}
