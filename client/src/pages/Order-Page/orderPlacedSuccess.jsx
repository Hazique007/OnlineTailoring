import React from "react";
import TopNav from "../../components/TopNav";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoMdHourglass } from "react-icons/io"; // Waiting icon
import successAnimation from "../../assets/animations/order-placed.gif"; // Replace with your MP4 file path

const OrderPlacedSuccess = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/Home");
  };

  return (
    <div className="mb-10">
      <TopNav />

      {/* Video Animation for Order Completion */}
      <div className="flex justify-center items-center pt-10">
        <img
          src={successAnimation}
          autoPlay
          loop={false}
          muted
          playsInline
          style={{ width: 220, height: 180 }}
        />
      </div>

      {/* Heading */}
      <h2 className="text-2xl text-[#DA3A3A] text-center font-[600] mt-6">Order Confirmed</h2>

      {/* Steps */}
      <div className="flex flex-col items-start space-y-6 mt-10 mx-auto w-3/4">
        {/* Step 1: Order Placed */}
        <div className="flex items-center">
          <FaCheckCircle className="text-[#4CAF50] text-[30px] mr-4" />
          <span className="text-xl font-poppins text-[#4CAF50]">Order Placed - Done</span>
        </div>

        {/* Step 2: Fabric Pickup */}
        <div className="flex items-center">
          <IoMdHourglass className="text-[#D4A706] text-[30px] mr-4" />
          <span className="text-xl font-poppins text-[#D4A706]">Fabric Pickup</span>
        </div>

        {/* Step 3: Measurement Done */}
        <div className="flex items-center">
          <IoMdHourglass className="text-[#D4A706] text-[30px] mr-4" />
          <span className="text-xl font-poppins text-[#D4A706]">Measurement </span>
        </div>

        {/* Step 4: Stitching Done */}
        <div className="flex items-center">
          <IoMdHourglass className="text-[#D4A706] text-[30px] mr-4" />
          <span className="text-xl font-poppins text-[#D4A706]">Stitching </span>
        </div>

        {/* Step 5: Apparel Delivery */}
        <div className="flex items-center">
          <IoMdHourglass className="text-[#D4A706] text-[30px] mr-4" />
          <span className="text-xl font-poppins text-[#D4A706]">Apparel Delivery</span>
        </div>

        {/* Step 6: Payment Done */}
        <div className="flex items-center">
          <IoMdHourglass className="text-[#D4A706] text-[30px] mr-4" />
          <span className="text-xl font-poppins text-[#D4A706]">Payment </span>
        </div>

        {/* Step 7: Order Completed */}
        <div className="flex items-center">
          <IoMdHourglass className="text-[#D4A706] text-[30px] mr-4" />
          <span className="text-xl font-poppins text-[#D4A706]">Order Completed</span>
        </div>
      </div>

      {/* Button */}
      <div className="flex items-center justify-center mt-20">
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

export default OrderPlacedSuccess;