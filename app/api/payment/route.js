// app/api/payment/route.js
import Payment from "@/models/Payment";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {

  const { user,product, shippingDetails, paymentMethod } = await request.json();

  // Connect to the database
  await connect();

  try {
    // Save the payment details to the database
    // Create a new Payment document
    const newPayment = new Payment({
      user,
      products:product,
      shippingDetails,
      paymentMethod,
    });
    console.log(newPayment);
    await newPayment.save();

    // Return a success response
    return new NextResponse("Payment successfully processed", { status: 200 });
  } catch (error) {
    // Handle errors
    console.error("Error processing payment:", error);
    return new NextResponse("Error processing payment", { status: 500 });
  }
};
