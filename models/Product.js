
import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  itemsInStock: Number,
}, { collection: 'products' });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export { productSchema, Product };
