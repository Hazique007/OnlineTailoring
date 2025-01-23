import React from "react";
import TopNav from "../../components/TopNav";
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa"; // Green check icon
import { IoMdHourglass } from "react-icons/io"; // Waiting icon

const orderPlacedSuccess = () => {
  const navigate = useNavigate();

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

        {/* Yellow Waiting Icon for the remaining steps */}
        <span className="text-[#D4A706]">
          <IoMdHourglass className="inline mr-2 text-[#D4A706]" />
          Fabric Pickup
        </span>
        <br /><br />

        <span className="text-[#D4A706]">
          <IoMdHourglass className="inline mr-2 text-[#D4A706]" />
          Measurement - Done
        </span>
        <br /><br />

        <span className="text-[#D4A706]">
          <IoMdHourglass className="inline mr-2 text-[#D4A706]" />
          Stitching - Done
        </span>
        <br /><br />

        <span className="text-[#D4A706]">
          <IoMdHourglass className="inline mr-2 text-[#D4A706]" />
          Apparel Delivery
        </span>
        <br /><br />

        <span className="text-[#D4A706]">
          <IoMdHourglass className="inline mr-2 text-[#D4A706]" />
          Payment - Done
        </span>
        <br /><br />

        <span className="text-[#D4A706]">
          <IoMdHourglass className="inline mr-2 text-[#D4A706]" />
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

export default orderPlacedSuccess;  