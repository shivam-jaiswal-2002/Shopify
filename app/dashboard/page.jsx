import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page =async () => {
  const session = await getServerSession();
  if(!session){
    redirect("/");
  }
  return (
    <div>Dashboard</div>
  )
}

export default page;