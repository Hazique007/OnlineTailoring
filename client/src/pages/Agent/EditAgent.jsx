import React, { useState, useEffect } from "react";
import AgentTopNav from "../../components/AgentTopNav";
import Search from "../../components/Search";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditAgent = () => {
  const { orderID } = useParams();
  const userID = localStorage.getItem("userID");

  const [orderData, setOrderData] = useState({
    user: null,
    order: null,
    status: {
      fabricPickedUp: false,
      measurementDone: false,
      apparelDelivered: false,
      paymentReceived: false,
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchAllOrderData = async () => {
    try {
      setIsLoading(true);

      // Fetch order details
      const orderResponse = await axios.get(
        "http://localhost:3000/orders/getOrderbyID",
        {
          params: { orderID },
        }
      );

      // Fetch agent-specific order status
      const agentResponse = await axios.get(
        "http://localhost:3000/agent/agentorder",
        {
          params: { orderID, userID },
        }
      );
      console.log(agentResponse);

      // Safely access the agent order data
      const agentOrder = agentResponse.data?.order?.[0] || {};
      const orderDetails = orderResponse.data?.order || {};
      const userData = orderResponse.data?.user?.[0] || {};

      setOrderData({
        user: userData,
        order: orderDetails,
        status: {
          fabricPickedUp: Boolean(agentOrder.fabricPickedUp),
          measurementDone: Boolean(agentOrder.measurementDone),
          apparelDelivered: Boolean(agentOrder.apparelDelivered),
          paymentReceived: Boolean(agentOrder.paymentReceived),
        },
      });
      // console.log("orderData", orderData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch order details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrderData();
  }, [orderID, userID]);

  const handleStatusChange = (field, value) => {
    setOrderData((prev) => ({
      ...prev,
      status: {
        ...prev.status,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const allCompleted = Object.values(orderData.status).every(
        (status) => status
      );
  
      const response = await axios.post(
        "http://localhost:3000/agent/updateagentorder",
        {
          updateData: orderData.status,
          status: allCompleted ? "done" : "pending", // Add this to update the status
        },
        {
          params: { userID, orderID },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        toast.success(allCompleted ? "Order Completed" : "Order Updated");
  
        // Refetch data after successful update
        await fetchAllOrderData();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
    }
  };
  

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Loading...
  //     </div>
  //   );
  // }

  const { user, order, status } = orderData;

  if (!user || !order) {
    return (
      <div className="flex justify-center items-center h-screen">
        No order data found
      </div>
    );
  }

  return (
    <div>
      <AgentTopNav />
      <div className="px-[17px] mt-[12px]">
        <Search />
      </div>
      <div className="p-4">
        <div className="w-full bg-white border-black border-2 p-2 px-3 mt-3 rounded-xl">
          {user.name} - {order.subCategory}
        </div>

        <div className="flex justify-between mt-5">
          <div>Fabric Picked up</div>
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={status.fabricPickedUp}
            onChange={(e) =>
              handleStatusChange("fabricPickedUp", e.target.checked)
            }
          />
        </div>

        <div className="flex justify-between mt-3">
          <div>Measurements Done</div>
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={status.measurementDone}
            disabled={!status.fabricPickedUp}
            onChange={(e) =>
              handleStatusChange("measurementDone", e.target.checked)
            }
          />
        </div>

        <div className="flex justify-between mt-3">
          <div>Apparel Delivered</div>
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={status.apparelDelivered}
            disabled={!status.measurementDone}
            onChange={(e) =>
              handleStatusChange("apparelDelivered", e.target.checked)
            }
          />
        </div>

        <div className="flex justify-between mt-3">
          <div>Payment Received</div>
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={status.paymentReceived}
            disabled={!status.apparelDelivered}
            onChange={(e) =>
              handleStatusChange("paymentReceived", e.target.checked)
            }
          />
        </div>
      </div>

      <div className="p-3">
        <button
          className="bg-white border-black border-2 w-full flex text-center justify-center rounded-xl p-1"
          onClick={handleSubmit}
          disabled={!Object.values(status).some((status) => status)}
        >
          Submit
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditAgent;