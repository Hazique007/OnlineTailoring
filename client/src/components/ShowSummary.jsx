import React from "react";

const ShowSummary = () => {
  const ProductItem = JSON.parse(localStorage.getItem("productItem"));
  return (
    <div className="font-poppins p-4">
      <div className="w-full mx-auto bg-white rounded-xl border border-black p-4">
        <div className="flex justify-between items-start">
          {/* Left side: Labels */}
          <div className="flex flex-col space-y-2">
            <div className="flex">
              <p className="font-medium text-gray-700 text-sm">Total Amount</p>
            </div>
            <div className="flex">
              <p className="font-medium text-gray-700 text-sm">Payment Mode</p>
            </div>
          </div>

          {/* Right side: Values */}
          <div className="flex flex-col space-y-2 text-right">
            <div className="flex">
              <p className="font-semibold text-black text-sm">₹{ProductItem.price}</p>
            </div>
            <div className="flex">
              <p className="font-medium text-black text-sm">Cash On Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSummary;
