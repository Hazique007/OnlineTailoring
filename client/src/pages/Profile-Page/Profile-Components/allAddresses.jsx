import React, { useState, useEffect } from "react";
import TopNav from "../../../components/TopNav";
import Navbar from "../../../components/Navbar";

const AllAddresses = () => {
  const [addresses, setAddresses] = useState([]); // Store addresses
  const [newAddress, setNewAddress] = useState({ name: "", address1: "", address2: "", pincode: "" }); // For adding a new address
  const [editingAddress, setEditingAddress] = useState(null); // For editing an address
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch("http://localhost:5000/list"); // Backend API to get all addresses
        if (response.ok) {
          const result = await response.json();
          setAddresses(result.data);
        } else {
          console.error("Failed to fetch addresses");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  // Handle input change for new or edited address
  const handleInputChange = (event, key) => {
    const value = event.target.value;
    if (editingAddress) {
      setEditingAddress({ ...editingAddress, [key]: value });
    } else {
      setNewAddress({ ...newAddress, [key]: value });
    }
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
        setAddresses([...addresses, result.data]); // Add new address to the list
        setNewAddress({ name: "", address1: "", address2: "", pincode: "" }); // Clear input fields
        setIsModalOpen(false); // Close the modal
      } else {
        console.error("Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  // Edit an existing address
  const handleEditAddress = async () => {
    try {
      const response = await fetch(`http://localhost:5000/edit/${editingAddress._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingAddress),
      });
      if (response.ok) {
        const updatedAddresses = addresses.map((addr) =>
          addr._id === editingAddress._id ? editingAddress : addr
        );
        setAddresses(updatedAddresses); // Update the address in the list
        setEditingAddress(null); // Exit editing mode
      } else {
        console.error("Failed to update address");
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  // Delete an address
  const handleDeleteAddress = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/delete/${id}`, { method: "DELETE" });
      if (response.ok) {
        setAddresses(addresses.filter((addr) => addr._id !== id)); // Remove the address from the list
      } else {
        console.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div>
      <TopNav />
      <h1 className="text-xl font-bold mb-4 p-6">Manage Addresses</h1>
      <div className="grid gap-6 p-6">
        {/* List of existing addresses */}
        {addresses.map((address) => (
          <div key={address._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-md">
            {editingAddress && editingAddress._id === address._id ? (
              <div className="flex flex-col">
                <input
                  type="text"
                  value={editingAddress.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  className="mb-2 p-2 border rounded"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={editingAddress.address1}
                  onChange={(e) => handleInputChange(e, "address1")}
                  className="mb-2 p-2 border rounded"
                  placeholder="Address Line 1"
                />
                <input
                  type="text"
                  value={editingAddress.address2}
                  onChange={(e) => handleInputChange(e, "address2")}
                  className="mb-2 p-2 border rounded"
                  placeholder="Address Line 2"
                />
                <input
                  type="text"
                  value={editingAddress.pincode}
                  onChange={(e) => handleInputChange(e, "pincode")}
                  className="p-2 border rounded"
                  placeholder="Pincode"
                />
              </div>
            ) : (
              <div>
                <p className="font-bold">{address.name}</p>
                <p>{address.address1}</p>
                <p>{address.address2}</p>
                <p className="text-sm font-semibold">Pincode: {address.pincode}</p>
              </div>
            )}
            <div className="flex space-x-2">
              {editingAddress && editingAddress._id === address._id ? (
                <button
                  onClick={handleEditAddress}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditingAddress(address)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDeleteAddress(address._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white h-14 w-14 flex items-center justify-center rounded-full shadow-lg text-2xl"
      >
        +
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Address</h2>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={newAddress.name}
                onChange={(e) => handleInputChange(e, "name")}
                className="p-2 border rounded"
                placeholder="Name"
              />
              <input
                type="text"
                value={newAddress.address1}
                onChange={(e) => handleInputChange(e, "address1")}
                className="p-2 border rounded"
                placeholder="Address Line 1"
              />
              <input
                type="text"
                value={newAddress.address2}
                onChange={(e) => handleInputChange(e, "address2")}
                className="p-2 border rounded"
                placeholder="Address Line 2"
              />
              <input
                type="text"
                value={newAddress.pincode}
                onChange={(e) => handleInputChange(e, "pincode")}
                className="p-2 border rounded"
                placeholder="Pincode"
              />
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleAddAddress}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        
      )}
     
    </div>
  );
};

export default AllAddresses;
