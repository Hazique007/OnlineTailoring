import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Pickup = () => {
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    address1: "",
    address2: "",
    pincode: "",
  });

  const [addresses, setAddresses] = useState([]); // Store all addresses

  // Handles input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  // Submits the form and sends data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/addresses/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddress), // Send the address data
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Address added:", data);
        setAddresses([...addresses, data]); // Add the new address to the list
        setShowForm(false); // Hide the form after submission
        setNewAddress({ name: "", address1: "", address2: "", pincode: "" }); // Clear the form
      } else {
        console.error("Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  return (
    <div className="flex flex-col px-[8px]">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <p className="pl-10 font-[700] text-[14px] pt-10">
            Pick up and Delivery Details
          </p>
          <p className="pl-10 font-[500] text-[12px] pt-2">
            Pick up and Delivery Address
          </p>
        </div>
        {/* Button to toggle form */}
        <button
          className="text-[12px] flex items-center bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-gray-400 hover:border-transparent rounded"
          onClick={() => setShowForm(!showForm)}
        >
          <FaMapMarkerAlt className="h-[16px] w-[15px] text-black font-[700]" />
          New Address
        </button>
      </div>

      {/* Form Section */}
      {showForm && 
      (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-4 rounded-md mt-4"
        >
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              value={newAddress.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="address1"
              value={newAddress.address1}
              onChange={handleInputChange}
              placeholder="Address Line 1"
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="address2"
              value={newAddress.address2}
              onChange={handleInputChange}
              placeholder="Address Line 2"
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="pincode"
              value={newAddress.pincode}
              onChange={handleInputChange}
              placeholder="Pincode"
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save Address
          </button>
        </form>
      )}

      {/* Display Saved Addresses */}
      <div className="mt-6">
        {addresses.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            No addresses added yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {addresses.map((address, index) => (
              <li
                key={index}
                className="bg-gray-100 p-4 rounded shadow-sm border border-gray-300"
              >
                <p className="font-bold">{address.name}</p>
                <p>{address.address1}</p>
                <p>{address.address2}</p>
                <p>{address.pincode}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pickup;
