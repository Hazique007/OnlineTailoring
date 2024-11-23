
import OrderSummary from "../models/orderSummarySchema"


// Create a new order summary
export const createOrderSummary = async (req, res) => {
    try {
      const { userId, stitchingCharges } = req.body;
  
      const newOrderSummary = new OrderSummary({
        userId,
        stitchingCharges,
      });
  
      await newOrderSummary.save();
      res.status(201).json(newOrderSummary);
    } catch (err) {
      res.status(500).json({ message: "Error creating order summary", error: err.message });
    }
  };
  
  // Get order summary by user ID
  export const getOrderSummaryByUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const orderSummary = await OrderSummary.findOne({ userId });
      if (!orderSummary) {
        return res.status(404).json({ message: "Order summary not found." });
      }
  
      res.status(200).json(orderSummary);
    } catch (err) {
      res.status(500).json({ message: "Error fetching order summary", error: err.message });
    }
  };
  
  // Update stitching charges
  export const updateStitchingCharges = async (req, res) => {
    try {
      const { userId } = req.params;
      const { stitchingCharges } = req.body;
  
      const updatedOrderSummary = await OrderSummary.findOneAndUpdate(
        { userId },
        { stitchingCharges },
        { new: true } // Return the updated document
      );
  
      if (!updatedOrderSummary) {
        return res.status(404).json({ message: "Order summary not found." });
      }
  
      res.status(200).json(updatedOrderSummary);
    } catch (err) {
      res.status(500).json({ message: "Error updating stitching charges", error: err.message });
    }
  };