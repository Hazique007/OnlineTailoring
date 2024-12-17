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
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddress), // Send the address data
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Address added", result);


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
    <div className="flex flex-col px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-lg">Pick up and Delivery Details</p>
          <p className="text-sm text-gray-600 mt-1">Pick up and Delivery Address</p>
        </div>
        <button
          className="text-sm flex items-center bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-gray-400 hover:border-transparent rounded"
          onClick={() => setShowForm(!showForm)}
        >
          <FaMapMarkerAlt className="h-4 w-4 mr-2" />
          New Address
        </button>
      </div>

      {showForm && (
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

      <div className="mt-6">
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
      </div>
    </div>
  );
};

export default Pickup;
