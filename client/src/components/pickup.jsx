import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Pickup = () => {
  const validPincodes = [
    "226001",
    "226002",
    "226003",
    "226004",
    "226005",
    "226006",
    "226007",
    "226010",
    "226012",
    "226016",
    "226017",
    "226018",
    "226019",
    "226020",
    "226021",
    "226022",
    "226023",
    "226024",
    "226025",
    "226028",
    "226029",
    "226030",
    "226101",
    "226102",
    "226201",
    "226202",
    "226301",
    "227105",
    "227125",
  ];

  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
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

  const validateFields = (address) => {
    if (!address.name.trim()) return "Name is required";
    if (!address.address1.trim()) return "Address Line 1 is required";
    if (!address.address2.trim()) return "Address Line 2 is required";
    if (!address.pincode.trim()) return "Pincode is required";
    if (address.pincode.length !== 6) return "Pincode must be exactly 6 digits";
    if (!validPincodes.includes(address.pincode))
      return "This pincode is not serviceable";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateFields(newAddress);
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    const currentUserID = localStorage.getItem("userID");

    try {
      const updatedAddress = { ...newAddress, userID: currentUserID };

      const response = await fetch(
        "http://localhost:3000/addAddressbyuserID",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAddress),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAddresses([...addresses, result.data]);
        setNewAddress({ name: "", address1: "", address2: "", pincode: "" });
        setShowForm(false);
        toast.success("Address added successfully!");
      } else {
        console.error("Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  return (
    <div className="p-4 px-5 flex flex-col font-poppins">
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
              required
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
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <ToastContainer />
    </div>
  );
};

export default Pickup;
