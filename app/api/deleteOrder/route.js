// pages/api/deleteorder.js
import connectDB from '../../../utils/db';
import Payment from '../../../models/Payment';
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(req) {
  const { orderId } = await req.json();

  await connectDB();
  try {
    // Delete the order from the database
    await Payment.findByIdAndDelete(orderId);

    return NextResponse.json({ message: 'Order canceled successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error canceling order:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
