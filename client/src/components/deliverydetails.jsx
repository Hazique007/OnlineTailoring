import React, { useState, useEffect } from "react";
import axios from "axios";

const Delivery = ({ onProceed }) => {
  const [selectedAddress, setSelectedAddress] = useState(""); // To store the selected address
  const [addresses, setAddresses] = useState([]); // To store the list of addresses
  const [showAll, setShowAll] = useState(false); // To toggle between showing 3 or all addresses
  const userID = localStorage.getItem("userID");
  const [newAddress, setNewAddress] = useState({
    name: "",
    address1: "",
    address2: "",
    pincode: "",
  }); // For adding a new address

  // Fetch addresses when component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/getAddressByUser",
          {
            params: { userID },
          }
        );

        if (response.data && response.data.data) {
          const filteredAddresses = response.data.data.filter(
            (address) => address.userID === userID
          );
          setAddresses(filteredAddresses);
        } else {
          console.error("No addresses found for this user");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [userID]);

  // Handle input change for new address
  const handleInputChange = (event, key) => {
    setNewAddress({ ...newAddress, [key]: event.target.value });
  };

  // Add a new address
  const handleAddAddress = async () => {
    try {
      const response = await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddress),
      });
      if (response.ok) {
        const result = await response.json();
        const addedAddress = result.data;

        // Update state immediately by adding the new address
        setAddresses((prevAddresses) => {
          const updatedAddresses = [addedAddress];
          return updatedAddresses;
        });

        // Optionally, select the newly added address
        setSelectedAddress(addedAddress._id);
        localStorage.setItem("selectedAddress", addedAddress._id); // Persist selected address

        // Clear the new address form
        setNewAddress({ name: "", address1: "", address2: "", pincode: "" });
      } else {
        console.error("Failed to add address: Response not OK");
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  // Handle address selection
  const handleAddressChange = (event) => {
    const newSelectedAddress = event.target.value;
    setSelectedAddress(newSelectedAddress);
    localStorage.setItem("selectedAddress", newSelectedAddress); // Persist selected address
  };

  const toggleView = () => {
    setShowAll(!showAll); // Toggle the visibility of all addresses
  };

  // Sort addresses to display the selected address at the top
  const sortedAddresses = [...addresses].sort((a, b) => {
    if (a._id === selectedAddress) return -1;
    if (b._id === selectedAddress) return 1;
    return 0;
  });

  const displayedAddresses = showAll
    ? sortedAddresses
    : sortedAddresses.slice(0, 3);

  return (
    <div className="p-4 rounded-md pl-4">
      {addresses.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">
          No address selected. Please add a new address.
        </p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-start">
          {displayedAddresses.map((address) => (
            <label
              key={address._id}
              className="flex items-center w-full mb-3 font-poppins"
            >
              <input
                type="radio"
                value={address._id}
                checked={selectedAddress === address._id}
                onChange={handleAddressChange}
                className="w-4 h-4 mr-3"
              />
              <div className="text-left">
                <p className=" text-[14px]"> Deliver to: {address.name}</p>
                <p className="text-[12px]">{address.address1}</p>
                <p className="text-[12px]">{address.address2}</p>
                <p className="text-[12px] font-bold">
                  Pincode: {address.pincode}
                </p>
              </div>
            </label>
          ))}
        </div>
      )}

      <div className="flex">
        <button
          onClick={toggleView}
          className="ml-auto px-4 py-2 text-right text-[#1043F9] font-[500] pt-5 text-[12px]"
        >
          {showAll ? "Show less..." : "View more..."}
        </button>
      </div>

      {/* Proceed button to navigate to the next part */}
    </div>
  );
};

export default Delivery;
