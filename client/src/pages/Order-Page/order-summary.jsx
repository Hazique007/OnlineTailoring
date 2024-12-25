import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShowSummary from "../../components/ShowSummary";

import Navbar from "../../components/Navbar";
import TopNav from "../../components/TopNav";
import SummaryBox from "../../components/Summarybox";
import Pickup from "../../components/pickup";
import Delivery from "../../components/deliverydetails";
import Works from "../../components/Works";

const OrderSummary = () => {
  const navigate = useNavigate();
  const [showSummary, setShowSummary] = useState(true);
  const summarySectionRef = useRef(null);

  const handlePlaceOrder = () => {
    navigate("/orderSuccessful");
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
      <div className=" mt-4 pb-24">
        {showSummary ? (
          <>
            <div ref={summarySectionRef}>
              <p className="text-center pt-6 pb-6 text-[#DA3A3A] text-[18px] font-[600]">
                Order Summary
              </p>
              <ShowSummary />
              <br />
              <Pickup />
              <div className="pt-6">
                <Delivery />
              </div>
              <Works />
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
            <div className="pt-6">
              <Delivery />
            </div>
            <Works />
            <div className="flex items-center justify-center mt-6">
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
