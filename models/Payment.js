// models/payment.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: {
    rate: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  quantity: { type: Number, required: true }
});

const paymentSchema = new Schema(
  {
    user:{
      type: String,
      required: true,
    },
    products: {
      type: [productSchema], 
      required: true,
    },
    shippingDetails: {
      type: Schema.Types.Mixed,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    status:{
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

export default Payment;
