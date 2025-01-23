import React, { useEffect, useState } from "react";
import TopNav from "../../components/TopNav";
import { useNavigate, useParams } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa"; // Green check icon
import { IoMdHourglass } from "react-icons/io"; // Waiting icon
import axios from "axios";

const OrderSuccessful = () => {
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState({
    fabricPickedUp: false,
    measurementDone: false,
    apparelDelivered: false,
    paymentReceived: false,
  });

  const {orderID} = useParams();
  const userID = localStorage.getItem("userID")

  // Fetch the order status from the backend using the orderID and userID
  const fetchOrderStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/agent/agentorderdetails?orderID=${orderID}&userID=${userID}`
      );
      console.log(response.data);
      

      if (response.status === 200) {
        const { fabricPickedUp, measurementDone, apparelDelivered, paymentReceived } = response.data.data;
        setOrderStatus({
          fabricPickedUp,
          measurementDone,
          apparelDelivered,
          paymentReceived,
        });
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
    }
  };

  useEffect(() => {
    fetchOrderStatus();
  }, [orderID, userID]);

  const handleProceed = () => {
    navigate('/Home');
  };

  return (
    <div className="mb-10">
      <TopNav />
      <div className="flex justify-center items-center pt-10">
        <FaCheckCircle className="text-4xl text-[#4CAF50] text-[80px]" />
      </div>
      <br />

      <h2 className="text-2xl text-[#DA3A3A] text-center font-[600] pb-3">Order Placed</h2>

      <p className="text-center pt-10">
        {/* Green Checkmark for Order Placed */}
        <span className="text-[#4CAF50]">
          <FaCheckCircle className="inline mr-2 " />
          Order Placed
        </span>
        <br /><br />

        {/* Conditional rendering based on order status */}
        <span className={`inline mr-2 ${orderStatus.fabricPickedUp ? 'text-[#4CAF50]' : 'text-[#D4A706]'}`}>
          <FaCheckCircle className={`inline mr-2 ${orderStatus.fabricPickedUp ? 'text-[#4CAF50]' : 'text-[#D4A706]'}`} />
          Fabric Pickup
        </span>
        <br /><br />

        <span className={`inline mr-2 ${orderStatus.measurementDone ? 'text-[#4CAF50]' : 'text-[#D4A706]'}`}>
          <FaCheckCircle className={`inline mr-2 ${orderStatus.measurementDone ? 'text-[#4CAF50]' : 'text-[#D4A706]'}`} />
          Measurement - Done
        </span>
        <br /><br />

        <span className={`inline mr-2 ${orderStatus.apparelDelivered ? 'text-[#4CAF50]' : 'text-[#D4A706]'}`}>
          <FaCheckCircle className={`inline mr-2 ${orderStatus.apparelDelivered ? 'text-[#4CAF50]' : 'text-[#D4A706]'}`} />
          Apparel Delivery
        </span>
        <br /><br />

        <span className={`inline mr-2 ${orderStatus.paymentReceived ? 'text-[#4CAF50]' : 'text-[#D4A706]'}`}>
          <FaCheckCircle className={`inline mr-2 ${orderStatus.paymentReceived ? 'text-[#4CAF50]' : 'text-[#D4A706]'}`} />
          Payment - Done
        </span>
        <br /><br />

        <span className={`inline mr-2 ${orderStatus.paymentReceived ? 'text-[#4CAF50]' : 'text-[#D4A706]'}`}>
          <FaCheckCircle className={`inline mr-2 ${orderStatus.paymentReceived ? 'text-[#4CAF50]' : 'text-[#D4A706]'}`} />
          Order Completed
        </span>
      </p>

      <div className="flex items-center justify-center mt-10">
        <button
          onClick={handleProceed}
          className="w-[314px] h-[50px] bg-gradient-to-r from-[#9C3FE4] to-[#C65647] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform active:scale-95"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessful;
