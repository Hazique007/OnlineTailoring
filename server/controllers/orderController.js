import Order from "../models/orderSchema.js";
import PersonalDetails from "../models/personaldetailsSchema.js"
import Otp from "../models/userSchema.js"

// Create a new order associated with a user
export const createOrder = async (req, res) => {
  try {
    const {
      userID, // New field to associate order with a user
      category,
      status,
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
      status,
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



// Update the status of an order
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderID } = req.query; // Get orderID and status from the request body

    // Validate that both orderID and status are provided
    if (!orderID ) {
      return res.status(400).json({ message: "OrderID and status are required" });
    }

    // Validate that the status is either "pending" or "done"
    // if (status !== "pending" && status !== "done") {
    //   return res.status(400).json({ message: "Invalid status. Status must be 'pending' or 'done'" });
    // }

    // Find the order by its ID
    const order = await Order.findById(orderID);

    // If the order is not found, return an error
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the status of the order
    order.status = "done"; 

    // Save the updated order
    await order.save();

    // Return the updated order in the response
    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
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


// Fetch all orders grouped by deliveryDate
export const getOrdersGroupedByDate = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find().sort({ createdAt: -1 }).lean(); // Sort by createdAt
    const userIds = [...new Set(orders.map((order) => order.userID))]; // Get unique user IDs
    console.log("User IDs from orders:", userIds);

    // Fetch all user details from PersonalDetails using userIDs from Otp
    const personalDetails = await PersonalDetails.find({ userID: { $in: userIds } }).lean();
    console.log("PersonalDetails fetched:", personalDetails);

    // Map userID to name for quick lookup
    const userMap = personalDetails.reduce((acc, details) => {
      acc[details.userID.toString()] = details.name; // Map userID to name
      return acc;
    }, {});

    // Log the user map for debugging
    console.log("User Map:", userMap);

    // Attach the user name to each order
    const enrichedOrders = orders.map((order) => ({
      ...order,
      userName: userMap[order.userID.toString()] || "Unknown User", // Use userID to find name
    }));

    // Group orders by createdAt
    const groupedOrders = enrichedOrders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString(); // Format date to string
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(order);
      return acc;
    }, {});

    // Send the grouped orders as the response
    res.status(200).json(groupedOrders);
  } catch (error) {
    console.error("Error in getOrdersGroupedByDate:", error);
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
    const { orderID } = req.query;

    // Fetch the order by its ID
    const order = await Order.findById(orderID);
    console.log(order);
    
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Fetch the user details from PersonalDetails using userID from the order
    const user = await PersonalDetails.find({userID:order.userID});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare the response with order and user information
    const response = {
      user , order
    };

    res.status(200).json(response);
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


// Save an address associated with a user


