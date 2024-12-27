import Order from "../models/orderSchema.js";

// Create a new order associated with a user
export const createOrder = async (req, res) => {
  try {
    const {
      userID, // New field to associate order with a user
      category,
      categoryDescription,
      colors,
      customizationOptions,
      description,
      fabric,
      gender,
      images,
      isCustomized,
      name,
      price,
      sizes,
      stock,
      subCategory,
      // productID,
    } = req.body;

    console.log(req.body);
    

    // Validate that userID is provided
    if (!userID) {
      return res.status(400).json({ message: "UserID is required to create an order" });
    }

    const newOrder = new Order({
      userID, // Associate order with the user
      category,
      categoryDescription,
      colors,
      customizationOptions,
      description,
      fabric,
      gender,
      images,
      isCustomized,
      name,
      price,
      sizes,
      stock,
      subCategory,
      // productID,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating from backend", error });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userID", "phoneNumber"); // Populates user phoneNumber
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};



// Get orders by userID

export const getOrdersByUser = async (req, res) => {
  try {
    const { userID } = req.query;

    // Validate that userID is provided
    if (!userID) {
      return res.status(400).json({ message: "UserID is required to fetch orders" });
    }

    // Find orders where userID matches
    const userOrders = await Order.find({ userID }); // Use find() to query by userID
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders", error });
  }
};


// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("userID", "phoneNumber"); // Populates user phoneNumber
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("userID", "phoneNumber");
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }

};
