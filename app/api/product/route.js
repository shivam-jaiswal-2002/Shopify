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
