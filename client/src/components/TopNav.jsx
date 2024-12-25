import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();
  const [isServicible, setIsServicible] = useState(false); // Default to false
  const [pincode, setPincode] = useState("");
  const [tempPincode, setTempPincode] = useState(""); // Temporary pincode for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // List of Lucknow pincodes
  const lucknowPincodes = [
    "226001",
    "226002",
    "226003",
    "226004",
    "226005",
    "226006",
    "226007",
    "226008",
    "226009",
    "226010",
  ];

  // Load state from localStorage when the component mounts
  useEffect(() => {
    const savedPincode = localStorage.getItem("pincode");
    if (savedPincode) {
      setPincode(savedPincode);
      setIsServicible(lucknowPincodes.includes(savedPincode)); // Set servicible state based on saved pincode
    }
  }, []);

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleSave = () => {
    if (lucknowPincodes.includes(tempPincode)) {
      setPincode(tempPincode);
      setIsServicible(true); // Set to servicible if valid pincode
      localStorage.setItem("pincode", tempPincode);
      setIsModalOpen(false); // Close the modal
    } else {
      alert("Non-servicible Pincode");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal
    setTempPincode(""); // Clear temporary pincode
  };

  const openModal = () => {
    setTempPincode(pincode || ""); // Pre-fill modal with saved pincode if any
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div>
      <div className="h-[46px] bg-gradient-to-r from-[#9C3FE4] to-[#C65647] w-full flex items-center justify-between px-[8px]">
        <div className="flex items-center">
          <IoIosArrowBack
            onClick={handleBackClick}
            className="h-[16px] w-[16px] text-[#FFFFFF] font-[700] cursor-pointer"
          />
          <p className="text-white leading-[24px] text-[16px] font-[500] font-poppins ml-2">
            Doorstep Stitching
          </p>
        </div>
        <p
          onClick={openModal} // Open modal on click
          className={`${
            isServicible ? "text-white font-[500]" : "text-white"
          } leading-[18px] text-[12px] font-poppins font-[400] cursor-pointer`}
        >
          {isServicible ? "Servicible" : "Select City"} {/* Show Select City initially */}
        </p>
      </div>

      {/* Dialog Box */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Enter Pincode</h2>
            <input
              type="text"
              value={tempPincode}
              onChange={(e) => setTempPincode(e.target.value)}
              className="p-2 border rounded w-full"
              placeholder="Enter Pincode"
            />
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNav;
