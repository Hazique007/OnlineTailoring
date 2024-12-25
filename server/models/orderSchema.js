import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  categoryDescription: {
    type: String,
    required: true,
  },
  colors: {
    type: [String], // Array of colors
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  customizationOptions: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: true,
  },
  fabric: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of image URLs
    required: true,
  },
  isCustomized: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sizes: {
    type: [String], // Array of sizes
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
