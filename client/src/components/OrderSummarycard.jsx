import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderSummaryCard = () => {
  const [orderData, setOrderData] = useState(null); // To store fetched order data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders/getorder");
        console.log(response);
        setOrderData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orderData) {
    return <div>Order not found.</div>;
  }

  const productData = JSON.parse(localStorage.getItem("productItem"));
  const productImage = productData?.images?.[0]
    ? `http://localhost:3000/uploads/${productData.images[0]}`
    : "placeholder-image.png";

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap", // Allow wrapping for smaller screens
        alignItems: "center",
        width: "100%", // Use full width for responsiveness
        maxWidth: "430px",
        padding: "18px",
        margin: "8px auto", // Center the card horizontally
        backgroundColor: "#fff",
        boxSizing: "border-box", // Include padding in width/height
      }}
    >
      <div
        style={{
          width: "30%", // Use percentage for responsive sizing
          maxWidth: "103px",
          height: "auto",
          aspectRatio: "1", // Maintain the square aspect ratio
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          marginRight: "12px",
        }}
      >
        <img
          src={productImage}
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
          {productData?.name || "Product Name"}
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "black",
            margin: "4px 0",
          }}
        >
          Rs. {productData?.price || "0"}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#555",
            margin: "4px 0",
          }}
        >
          QTY: 1 | Fabric: {productData?.fabric || "Unknown"}
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
            onClick={() => console.log("Remove item clicked")}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
