// pages/api/products.js

import connectDB from '../../../utils/db';
import {Product} from '../../../models/Product';
import { NextResponse } from 'next/server';

export const GET = async (req, res) => {
  await connectDB();

  try {
    const products = await Product.find();
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new NextResponse(err, {
      status: 500,
    });
  }  
}



export const PUT = async (req, res) => {
  await connectDB();

  const { id } = req.query;
  const { quantity } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (quantity > product.ItemsInStock) {
    
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    // Update the stock
    product.ItemsInStock -= quantity;
    await product.save();
    console.log("products not found here ");
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
