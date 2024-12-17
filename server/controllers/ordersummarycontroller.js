
import OrderSummary from "../models/orderSummarySchema"


// Create a new order summary
export const createOrderSummary = async (req, res) => {
  try {
    const { userId, fabricStyle, fabricCharges, stitchingCharges, deliveryDate } = req.body;

    const newOrder = new OrderSummary({
      userId,
      fabricStyle,
      fabricCharges,
      stitchingCharges,
      deliveryDate,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: "Error creating order summary", error: err.message });
  }
};

// Get order summary by user ID
export const getOrderSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    const orderSummary = await OrderSummary.find({ userId });
    if (!orderSummary) {
      return res.status(404).json({ message: "Order summary not found." });
    }

    res.status(200).json(orderSummary);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order summary", error: err.message });
  }
};

// Update an order summary
export const updateOrderSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedOrder = await OrderSummary.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order summary not found." });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error updating order summary", error: err.message });
  }
};

// Delete an order summary
export const deleteOrderSummary = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await OrderSummary.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order summary not found." });
    }

    res.status(200).json({ message: "Order summary deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error deleting order summary", error: err.message });
  }
};
