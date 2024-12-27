import React from "react";

const ShowSummary = () => {
  const ProductItem = JSON.parse(localStorage.getItem("productItem"));
  return (
    <div className="font-poppins p-5 space-y-5"> {/* Adds padding */}
      <div className="w-full mx-auto bg-white rounded-xl border border-black p-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col space-y-2">
            <p className="font-medium text-gray-700 text-sm">Total Amount</p>
            <p className="font-medium text-gray-700 text-sm">Payment Mode</p>
          </div>
          <div className="flex flex-col space-y-2 text-right">
            <p className="font-semibold text-black text-sm">Rs. {ProductItem.price}</p>
            <p className="font-medium text-black text-sm">Cash On Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSummary;
