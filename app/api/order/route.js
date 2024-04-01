// pages/api/order.js
import connectDB from '../../../utils/db';
import Payment from '../../../models/Payment';
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/react';
export async function POST(req) {
  const { user } = await req.json();

  // Connect to the database
  await connectDB();
  try {

    // // Fetch payments based on the user's email
    const payments = await Payment.find({ user: user });

    // Return the fetched orders as a JSON response
    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error response
    console.error('Error fetching orders:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};
