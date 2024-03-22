// models/Product.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  // Add any other fields present in your MongoDB collection
}, { collection: 'products' }); // Specify the collection name explicitly

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export { productSchema, Product };
