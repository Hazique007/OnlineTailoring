import React, { useState, useEffect } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const OrderSummaryCard = () => {
  const [orderData, setOrderData] = useState(null); // To store fetched order data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    // Fetch data from the API using Axios
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/orders/getorder"
        );
        console.log(response);
        setOrderData(response.data); // Assuming the API response contains the order data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message); // Set the error message if something goes wrong
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <BeatLoader size={10} />
      </div>
    );
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
        alignItems: "center",
        width: "420px",
        height: "150px",
        padding: "8px",
        margin: "8px",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          width: "103px",
          height: "115px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          marginRight: "12px",
        }}
      >
        <img
          src={productImage}
          alt="Product"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        className="pt-3"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
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
            fontSize: "0.9rem",
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
              fontSize: "0.9rem",
              color: "#555",
            }}
          >
            Delivery in 3 days
          </p>
          <button
            className="pr-8"
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
