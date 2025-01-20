import React, { useState, useEffect } from 'react';
import AgentTopNav from '../../components/AgentTopNav';
import Search from '../../components/Search';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const EditAgent = () => {
  const { orderID } = useParams();
  const userID = localStorage.getItem("userID")
  const [orderData, setOrderData] = useState(null);
  const [isFabricPicked, setIsFabricPicked] = useState(false);
  const [isMeasurementsDone, setIsMeasurementsDone] = useState(false);
  const [isApparelDelivered, setIsApparelDelivered] = useState(false);
  const [isPaymentReceived, setIsPaymentReceived] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [user, setuser] = useState('')

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`https://apna-darzi-samar.onrender.com/orders/getOrderbyID`, {
          params: { orderID },
        });
        const { fabricPickedUp, measurementDone, apparelDelivered, paymentReceived } = response.data.order;

        setOrderData(response.data.order);
        setuser(response.data.user[0]);
        setIsFabricPicked(fabricPickedUp);
        setIsMeasurementsDone(measurementDone);
        setIsApparelDelivered(apparelDelivered);
        setIsPaymentReceived(paymentReceived);

        // Enable submit button only if all boxes are true
        setIsSubmitDisabled(!(fabricPickedUp && measurementDone && apparelDelivered && paymentReceived));
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, [orderID]);

  const handleSubmit = async () => {
    const isOrderCompleted = isFabricPicked && isMeasurementsDone && isApparelDelivered && isPaymentReceived;

    try {
      console.log("entering");
      
      // Update the order in the backend
      await axios.put(`https://apna-darzi-samar.onrender.com/agent/updateagentorder`, {
       params:{userID,orderID}},{

        fabricPickedUp: isFabricPicked,
        measurementDone: isMeasurementsDone,
        apparelDelivered: isApparelDelivered,
        paymentReceived: isPaymentReceived,
        ...(isOrderCompleted && { status: 'done' }), // Update status to 'done' if completed
      });

      if (isOrderCompleted) {
        toast.success('Order Completed');
      } else {
        toast.info('Order Updated');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Error updating order status');
    }
  };

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
          disabled={!isFabricPicked}
        >
          Submit
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditAgent;
