import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderSummaryCard from "../../../components/OrderSummarycard"; // Reuse the card component

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/orders/getorder"
        ); // Fetch all orders
        setOrders(response.data.orders); // Assume response contains an array of orders
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {orders.map((order) => (
        <OrderSummaryCard key={order.productID} order={order} /> // Pass each order to the card
      ))}
    </div>
  );
};

export default OrderHistory;
