import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import TopNav from "../../components/TopNav";
import SummaryBox from "../../components/Summarybox";
import Pickup from "../../components/pickup";
import Delivery from "../../components/deliverydetails";
import Works from "../../components/Works";

const OrderSummary = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/orderSuccessful");
  };

  return (
    <div className="pb-20">
      <TopNav />
      <div className="px-[11px] mt-[17px] pb-24">
        <h1 className="font-poppins font-[700] text-[14px] text-[#737373] ">
          Men {">"} Formal Shirts {">"} Style Name
        </h1>

        <p className="text-center pt-10 text-[#DA3A3A] text-[16px] font-[500]">
          Appointment and Fabric Pick Up
        </p>
        <SummaryBox />
        <Pickup />
        <div className="pt-10">
          <Delivery />
        </div>
        <Works />
        <div className="flex items-center justify-center mt-10">
          <button
            onClick={handleProceed}
            className=" w-[314px] h-[50px] bg-gradient-to-r from-[#9C3FE4]  to-[#C65647] hover:bg-blue-700  text-white font-bold py-2 px-4 rounded-lg transition-transform transform active:scale-95"
          >
            Place Order
          </button>
        </div>

        <Navbar />
      </div>
    </div>
  );
};

export default OrderSummary;
