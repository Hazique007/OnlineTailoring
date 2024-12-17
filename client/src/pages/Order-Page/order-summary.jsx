import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ShowSummary from "../../components/ShowSummary";

import Navbar from "../../components/Navbar";
import TopNav from "../../components/TopNav";
import SummaryBox from "../../components/Summarybox"
import Pickup from "../../components/pickup"
import Delivery from "../../components/deliverydetails";
import Works from "../../components/Works";
// import { MdLocationOn } from "react-icons/md";

const OrderSummary = () => {

  const navigate = useNavigate();
  const [showSummary, setShowSummary] = useState(false);
  const summarySectionRef = useRef(null); // Reference for the section to scroll to

  const handlePlaceOrder = () => {
    navigate('/orderSuccessful');
  };

  const handleProceed = () => {
    setShowSummary(true);
  };

  // Trigger scroll effect after the content is updated
  useEffect(() => {
    if (showSummary && summarySectionRef.current) {
      summarySectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showSummary]); // This hook runs when showSummary state changes

  return (
    <div className="pb-20">
      <TopNav />
      <div className="px-[11px] mt-[17px] pb-24">
        {showSummary ? (
          <>
           <div ref={summarySectionRef}>
            <p className="text-center pt-10 pb-10 text-[#DA3A3A] text-[20px] font-[700]">
              Order Summary
            </p>
            {/* Add ref here to scroll to this section */}
              <ShowSummary />
              <br></br>
              <Pickup />
              <div className="pt-10">
                <Delivery />
              </div>
              <Works />
              <div className="flex items-center justify-center mt-10">
                <button
                  onClick={handlePlaceOrder}
                  className="w-[314px] h-[50px] bg-gradient-to-r from-[#9C3FE4] to-[#C65647] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform active:scale-95"
                >
                  Place Order
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-poppins font-[700] text-[14px] text-[#737373]">
              Men {">"} Formal Shirts {">"} Style Name
            </h1>

            <p className="text-center pt-10 text-[#DA3A3A] text-[18px] font-[700]">
              Appointment and Fabric Pick Up
            </p>

            <div className="bg-[#f5f5f5] p-4 rounded-md mt-6 items-center justify-center">
              <SummaryBox />
            </div>
            <Pickup />
            <div className="pt-10">
              <Delivery />
            </div>
            <Works />
            <div className="flex items-center justify-center mt-10">
              <button
                onClick={handleProceed}
                className="w-[314px] h-[50px] bg-gradient-to-r from-[#9C3FE4] to-[#C65647] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform active:scale-95"
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
