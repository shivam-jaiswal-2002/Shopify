// app/api/payment/route.js
import Payment from "@/models/Payment";
import { Product } from "@/models/Product"; // Import the Product model
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { user, products, shippingDetails, paymentMethod } = await request.json();

  // Connect to the database
  await connect();

  try {
    // Save the payment details to the database
    const newPayment = new Payment({
      user,
      products,
      shippingDetails,
      paymentMethod,
    });
    console.log(newPayment);
    await newPayment.save();

    // Update the itemsInStock for each product
    for (const product of products) {
      const { id, quantity } = product;
      const existingProduct = await Product.findOne({id});

      if (!existingProduct) {
        return new NextResponse(`Product with ID ${id} not found`, { status: 404 });
      }

      // Check if the requested quantity is greater than available stock
      if (quantity > existingProduct.itemsInStock) {
        return new NextResponse(`Insufficient stock for product with ID ${id}`, { status: 400 });
      }

      // Update itemsInStock for the product
      existingProduct.itemsInStock -= quantity;
      await existingProduct.save();
    }

    // Return a success response
    return new NextResponse("Payment successfully processed", { status: 200 });
  } catch (error) {
    // Handle errors
    console.error("Error processing payment:", error);
    return new NextResponse("Error processing payment", { status: 500 });
  }
};
