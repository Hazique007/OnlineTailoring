import mongoose from "mongoose";

const orderSummarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Links the order to a specific user
  },
  stitchingCharges: {
    type: Number,
    required: true,
    default: 0, // Default value if not provided
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the order creation date
  },
});

const OrderSummary = mongoose.model("OrderSummary", orderSummarySchema);

export default OrderSummary;
