import React, { useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const OrderSummaryCard = ({ order, removeOrder }) => {
  // Directly use the order prop for displaying order details
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRemove = async () => {
    try {
      // Set loading state to true while deleting
      setLoading(true);

      // Make a DELETE request to remove the order from the backend
      await axios.delete(`http://localhost:3000/orders/${order._id}`);

      // Remove the order from the UI by calling the removeOrder function passed as a prop
      removeOrder(order._id);

      setLoading(false); // Set loading to false after the operation is complete
    } catch (error) {
      setError("Error removing order from frontend: " + error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Removing...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  const { images, name, price, fabric } = order;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        maxWidth: "430px",
        padding: "18px",
        margin: "8px auto",
        backgroundColor: "#fff",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "30%",
          maxWidth: "103px",
          height: "auto",
          aspectRatio: "1",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          marginRight: "12px",
        }}
      >
        <img
          src={`http://localhost:3000/uploads/${images?.[0]}`}
          alt="Product"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            fontSize: "0.9rem",
            margin: "0",
            fontWeight: "bold",
            marginBottom: "4px",
          }}
        >
          {name || "Product Name"}
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "black",
            margin: "4px 0",
          }}
        >
          Rs. {price || "0"}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#555",
            margin: "4px 0",
          }}
        >
          Fabric: {fabric || "Unknown"}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "4px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#555",
            }}
          >
            Delivery in 3 days
          </p>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "12px",
              textDecoration: "underline",
              cursor: "pointer",
              color: "grey",
            }}
            onClick={handleRemove} // Ensure the function is called here
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
