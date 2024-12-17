import React, { useState, useEffect } from "react";

const Delivery = () => {
  const [selectedAddress, setSelectedAddress] = useState(""); // To store the selected address
  const [addresses, setAddresses] = useState([]); // To store the list of addresses
  const [showAll, setShowAll] = useState(false); // To toggle between showing 3 or all addresses
  const [newAddress, setNewAddress] = useState({ name: "", address1: "", address2: "", pincode: "" }); // For adding a new address

  // Fetch addresses when component mounts
  const fetchAddresses = async () => {
    try {
      const response = await fetch("http://localhost:5000/list"); // Backend API to get all addresses
      if (response.ok) {
        const result = await response.json();
        if (Array.isArray(result.data)) {
          setAddresses(result.data); // Set the addresses from 'data'
          // Automatically select the last entered address
          if (result.data.length > 0) {
            setSelectedAddress(result.data[result.data.length - 1]._id); // Set the most recent address as selected
          }
        }
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses(); // Fetch addresses when component mounts
  }, []);

  // Handle input change for new address
  const handleInputChange = (event, key) => {
    setNewAddress({ ...newAddress, [key]: event.target.value });
  };

  // Add a new address
  const handleAddAddress = async () => {
    try {
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddress),
      });
      if (response.ok) {
        const result = await response.json();
        const addedAddress = result.data;

        // Update state immediately by adding the new address
        setAddresses((prevAddresses) => {
          const updatedAddresses = [...prevAddresses, addedAddress];
          return updatedAddresses;
        });

        // Optionally, select the newly added address
        setSelectedAddress(addedAddress._id);

        // Clear the new address form
        setNewAddress({ name: "", address1: "", address2: "", pincode: "" });
      } else {
        console.error("Failed to add address: Response not OK");
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value); // Update the selected address when user selects a different one
  };

  const toggleView = () => {
    setShowAll(!showAll); // Toggle the visibility of all addresses
  };

  const displayedAddresses = showAll ? addresses : addresses.slice(0, 3);

  return (
    <div className="p-4 rounded-md pl-10">
      {addresses.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">
          No address selected. Please add a new address.
        </p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-start">
          {displayedAddresses.map((address) => (
            <label
              key={address._id}
              className="flex flex-col bg-gray-50 p-4 rounded-md shadow-md w-60"
            >
              <input
                type="radio"
                value={address._id}
                checked={selectedAddress === address._id}
                onChange={handleAddressChange}
                className="w-4 h-4 mb-4"
              />
              <div className="text-left">
                <p className="font-bold text-[15px]">{address.name}</p>
                <p className="text-[12px]">{address.address1}</p>
                <p className="text-[12px]">{address.address2}</p>
                <p className="text-[12px] font-bold">Pincode: {address.pincode}</p>
              </div>
            </label>
          ))}
        </div>
      )}

      <div className="flex">
        <button onClick={toggleView} className="ml-auto px-4 py-2 text-right text-[#1043F9] font-[500] pt-5 text-[12px]">
          {showAll ? "Show less..." : "View more..."}
        </button>
      </div>
    </div>
  );
};

export default Delivery;
