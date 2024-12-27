import React, { useState, useEffect } from "react";
import axios from "axios";
import Topnav from '../../../components/TopNav';
import OrderSummaryCard from "../../../components/OrderSummarycard";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]); // To store fetched orders
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    // Fetch all orders from the API using Axios
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders/getorder");
        setOrders(response.data); // Assuming the API returns an array of orders
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message); // Set the error message if something goes wrong
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array ensures this runs once when the component is mounted

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if something went wrong
  }

  if (!orders.length) {
    return <div>No orders found.</div>; // Display fallback message if no orders
  }

  return (
    <div className="pb-20 font-poppins">
      <Topnav />
      <div className="mt-4 pb-24">
        <p className="text-center pt-6 pb-6 text-[#DA3A3A] text-[18px] font-[600]">
          Order History
        </p>
        <div>
          {orders.map((order, index) => (
            <OrderSummaryCard key={index} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
