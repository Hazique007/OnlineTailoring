import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShowSummary from "../../components/ShowSummary";
import Navbar from "../../components/Navbar";
import TopNav from "../../components/TopNav";
import SummaryBox from "../../components/Summarybox";
import Pickup from "../../components/pickup";
import Delivery from "../../components/deliverydetails";
import Works from "../../components/Works";
import OrderSummaryCard from "../../components/OrderSummarycard";

const OrderSummary = () => {
  const navigate = useNavigate();
  const [showSummary, setShowSummary] = useState(true);
  const summarySectionRef = useRef(null);

  const handlePlaceOrder = async () => {
    try {
      const productData = JSON.parse(localStorage.getItem("productItem"));
      if (!productData) {
        alert("No product data found.");
        return;
      }

      const orderDetails = {
        ...productData,
        userID: "12345",
        status: "Placed",
        orderDate: new Date(),
      };

      const response = await axios.post("http://localhost:3000/orders/create", orderDetails);
      if (response.status === 201) {
        console.log(response);
        navigate("/orderSuccessful");
      } else {
        console.error("Order placement failed.");
      }
    } catch (error) {
      console.error("Error placing order:", error.message);
      alert("An error occurred while placing the order.");
    }
  };

  const handleProceed = () => {
    setShowSummary(true);
  };

  useEffect(() => {
    if (showSummary && summarySectionRef.current) {
      summarySectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showSummary]);

  return (
    <div className="pb-20 font-poppins">
      <TopNav />
      <div className="mt-4 pb-24 space-y-5"> {/* Adds padding of 20px */}
        {showSummary ? (
          <>
            <div ref={summarySectionRef}>
              <p className="text-center pt-5 pb-5 text-[#DA3A3A] text-[18px] font-[600]">
                Order Summary
              </p>
              <ShowSummary />
              <OrderSummaryCard />
              <Pickup />
              <Delivery />
              <div className="px-5">
            <Works />


            </div>
              <div className="flex items-center justify-center mt-6 pt-10">
                <button
                  onClick={handlePlaceOrder}
                  className="w-[280px] h-[45px] bg-gradient-to-r from-[#9C3FE4] to-[#C65647] hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded-lg transition-transform transform active:scale-95"
                >
                  Place Order
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-[600] text-[12px] text-[#737373]">
              Men {">"} Formal Shirts {">"} Style Name
            </h1>
            <p className="text-center pt-6 text-[#DA3A3A] text-[16px] font-[600]">
              Appointment and Fabric Pick Up
            </p>
            <div className="bg-[#f5f5f5] p-4 rounded-md mt-4">
              <SummaryBox />
            </div>
            <Pickup />
            <Delivery />
            <div className="px-5">
            <Works />


            </div>
          
            <div className="flex items-center justify-center px-5">
              <button
                onClick={handleProceed}
                className="w-[280px] h-[45px] bg-gradient-to-r from-[#9C3FE4] to-[#C65647] hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded-lg transition-transform transform active:scale-95"
              >
                Proceed
              </button>
            </div>
          </>
        )}
        <Navbar />
      </div>
    </div>
  );
};

export default OrderSummary;
