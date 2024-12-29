import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Pickup = () => {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([]); // Initialize as an empty array
  const [newAddress, setNewAddress] = useState({
    name: "",
    address1: "",
    address2: "",
    pincode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://online-tailoring-hazique.onrender.com/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddress), // Send the address data
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Address added", result);

        // Add new address to the list
        setAddresses([...addresses, newAddress]);

        setShowForm(false); // Close form
        setNewAddress({
          name: "",
          address1: "",
          address2: "",
          pincode: "",
        });
      } else {
        console.error("Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  return (
    <div className="p-4 px-5 flex flex-col  font-poppins">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-sm">Pick up and Delivery Details</p>
          <p className="text-xs text-gray-600 mt-1">
            Pick up and Delivery Address
          </p>
        </div>
        <button
          className="pl-5 text-xs flex items-center bg-transparent hover:bg-blue-500 text-black font-medium hover:text-white py-1 px-3 border border-gray-300 hover:border-transparent rounded"
          onClick={() => setShowForm(!showForm)}
        >
          <FaMapMarkerAlt className="h-4 w-4 mr-1" />
          New Address
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-4 rounded-md mt-4"
        >
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              name="name"
              value={newAddress.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="p-2 border border-gray-300 rounded text-sm"
              required
            />
            <input
              type="text"
              name="address1"
              value={newAddress.address1}
              onChange={handleInputChange}
              placeholder="Address Line 1"
              className="p-2 border border-gray-300 rounded text-sm"
              required
            />
            <input
              type="text"
              name="address2"
              value={newAddress.address2}
              onChange={handleInputChange}
              placeholder="Address Line 2"
              className="p-2 border border-gray-300 rounded text-sm"
            />
            <input
              type="text"
              name="pincode"
              value={newAddress.pincode}
              onChange={handleInputChange}
              placeholder="Pincode"
              className="p-2 border border-gray-300 rounded text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-3 bg-blue-500 text-white py-2 px-3 text-sm rounded"
          >
            Save Address
          </button>
        </form>
      )}

      <div className="mt-5">
        <ul className="space-y-2">
          {addresses.map((address, index) => (
            <li key={index} className="flex items-start">
              <input
                type="radio"
                name="selectedAddress"
                className="h-4 w-4 mt-1 mr-2"
              />
              <div className="text-xs">
                <p className="font-semibold text-sm">{address.name}</p>
                <p>{address.address1}</p>
                <p>{address.address2}</p>
                <p>{address.pincode}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pickup;
