import connectDB from "../../../utils/db";
import {Product} from '../../../models/Product';
import { NextResponse, NextRequest } from "next/server";
export const revalidate = 0;
export const PUT = async (req, res) => {
    await connectDB();
    const {id, quantity} = await req.json();
    console.log(id,quantity);
    // console.log(quantity, id);
    try {
      const product = await Product.findById(id);
  
      if (!product) {
        return new NextResponse('Product not found', { status: 404 });
      }
  
      if (quantity > product.ItemsInStock) {
        return new NextResponse('Insufficient stocks', { status: 400 });
      }
  
      // Update the stock
      product.ItemsInStock -= quantity;
      await product.save();
      console.log("products not found here ");
      return new NextResponse(JSON.stringify(product), { status: 200 });
    } catch (error) {
      return new NextResponse(error.message, { status: 500 });
    }
  };
  