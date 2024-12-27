import mongoose from 'mongoose';


const OrderSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
      ref: 'Otp',
      required: true,
    },
    // productID: {
    //   type: mongoose.Schema.Types.ObjectId, 
    //   required: true,
    //   ref:"Product",
    // },
    category: {
      type: String,
      required: true,
    },
    categoryDescription: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    customizationOptions: {
      type: String,
      default: '',
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
      type: [String],
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
      type: [String],
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
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', OrderSchema);
export default Order;
