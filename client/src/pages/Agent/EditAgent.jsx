import React, { useState, useEffect } from 'react';
import AgentTopNav from '../../components/AgentTopNav';
import Search from '../../components/Search';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditAgent = () => {
  const { orderID } = useParams();
  const userID = localStorage.getItem("userID");
  const [orderData, setOrderData] = useState(null);
  const [isFabricPicked, setIsFabricPicked] = useState();
  const [isMeasurementsDone, setIsMeasurementsDone] = useState();
  const [isApparelDelivered, setIsApparelDelivered] = useState();
  const [isPaymentReceived, setIsPaymentReceived] = useState();
  const [user, setUser] = useState('');

  // Fetch initial order data
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get('https://final-backend-cache-2.onrender.com/orders/getOrderbyID', {
          params: { orderID },
        });
        const { fabricPickedUp, measurementDone, apparelDelivered, paymentReceived } = response.data.order;

        setOrderData(response.data.order);
        setUser(response.data.user[0]);
        setIsFabricPicked(fabricPickedUp);
        setIsMeasurementsDone(measurementDone);
        setIsApparelDelivered(apparelDelivered);
        setIsPaymentReceived(paymentReceived);
      } catch (error) {
        console.error('Error fetching order data:', error);
        toast.error('Failed to fetch order details');
      }
    };

    fetchOrderData();
  }, [orderID]);

  // Fetch agent order details for checkboxes
  useEffect(() => {
    const fetchAgentOrder = async () => {
      try {
        const response = await axios.get('https://final-backend-cache-2.onrender.com/agent/agentorder', {
          params: { orderID, userID },
        });
        const order = response.data.order[0]; // Assuming order is an array
        setIsFabricPicked(order.fabricPickedUp);
        setIsMeasurementsDone(order.measurementDone);
        setIsApparelDelivered(order.apparelDelivered);
        setIsPaymentReceived(order.paymentReceived);
      } catch (error) {
        console.error('Error fetching agent order:', error);
        toast.error('Failed to fetch agent order details');
      }
    };

    fetchAgentOrder();
  }, [orderID, userID]);

  // Handle submit to update the order
  const handleSubmit = async () => {
    const updateData = {
      fabricPickedUp: isFabricPicked,
      measurementDone: isMeasurementsDone,
      apparelDelivered: isApparelDelivered,
      paymentReceived: isPaymentReceived,
    };

    try {
      const response = await axios.post(
        'https://final-backend-cache-2.onrender.com/agent/updateagentorder',
        { updateData },
        {
          params: { userID, orderID },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const message =
          updateData.fabricPickedUp &&
          updateData.measurementDone &&
          updateData.apparelDelivered &&
          updateData.paymentReceived
            ? 'Order Completed'
            : 'Order Updated';
        toast.success(message);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Error updating order status');
    }
  };

  // If the orderData is not yet loaded, show a loading message
  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AgentTopNav />
      <div className="px-[17px] mt-[12px]">
        <Search />
      </div>
      <div className="p-4">
        <div className="w-full bg-white border-black border-2 p-2 px-3 mt-3 rounded-xl">
          {user.name} - {orderData.subCategory}
        </div>

        <div className="flex justify-between mt-5">
          <div>Fabric Picked up</div>
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={isFabricPicked}
            onChange={(e) => setIsFabricPicked(e.target.checked)}
          />
        </div>

        <div className="flex justify-between mt-3">
          <div>Measurements Done</div>
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={isMeasurementsDone}
            disabled={!isFabricPicked}
            onChange={(e) => setIsMeasurementsDone(e.target.checked)}
          />
        </div>

        <div className="flex justify-between mt-3">
          <div>Apparel Delivered</div>
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={isApparelDelivered}
            disabled={!isMeasurementsDone}
            onChange={(e) => setIsApparelDelivered(e.target.checked)}
          />
        </div>

        <div className="flex justify-between mt-3">
          <div>Payment Received</div>
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={isPaymentReceived}
            disabled={!isApparelDelivered}
            onChange={(e) => setIsPaymentReceived(e.target.checked)}
          />
        </div>
      </div>

      <div className="p-3">
        <button
          className="bg-white border-black border-2 w-full flex text-center justify-center rounded-xl p-1"
          onClick={handleSubmit}
          disabled={!isFabricPicked && !isMeasurementsDone && !isApparelDelivered && !isPaymentReceived}
        >
          Submit
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditAgent;
