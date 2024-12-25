import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderSummaryCard = () => {
  const [orderData, setOrderData] = useState(null); // To store fetched order data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state
  
  useEffect(() => {
    // Fetch data from the API using Axios
    const fetchOrderData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders/getorder");
        console.log(response);
        setOrderData(response.data); // Assuming the API response contains the order data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message); // Set the error message if something goes wrong
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []); // Empty dependency array ensures this runs once when the component is mounted

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if something went wrong
  }

  if (!orderData) {
    return <div>Order not found.</div>; // Display fallback message if no order data
  }

  // Assuming the product image is stored in local storage (if needed)
  const productImage = JSON.parse(localStorage.getItem("productItem"))?.images[0];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      width: '420px',
      height: '150px',
      padding: '8px',
      margin: '8px',
      backgroundColor: '#fff',
    }}>
      <div style={{
        width: '103px',
        height: '115px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        overflow: 'hidden',
        marginRight: '12px',
      }}>
        {/* Fetch image from local storage */}
        {productImage && (
          <img 
            className='object-fit w-[103px] h-[115px]'
            src={`http://localhost:3000/uploads/${orderData[0].images[0]}`}  // Image from local storage
            alt="Product" 
            style={{ objectFit: 'cover' }} 
          />
        )}
      </div>
      <div 
      className='pt-3'
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        
        height: '100%',
      }}>
        <h3 style={{
          fontSize: '0.9rem',
          margin: '0',
          fontWeight: 'bold',
          marginBottom: '4px',
        }}>
          {orderData[0].name}
        </h3>
        <p style={{
          fontSize: '14px',
          color: 'black',
          margin: '4px 0',
        }}>
          Rs. {orderData[0].price}
        </p>
        {/* <p style={{
          fontSize: '14px',
          color: 'red',
          fontWeight: 'bold',
          margin: '4px 0',
        }}>
          Rs. {orderData[0].discountedPrice}
        </p> */}
        <p style={{
          fontSize: '0.9rem',
          color: '#555',
          margin: '4px 0',
        }}>
          QTY: 1 | Fabric : {orderData[0].fabric}
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '4px',
        }}>
          <p style={{
            fontSize: '0.9rem',
            color: '#555',
          }}>
            Delivery in 3 days
          </p>
          <button 
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '0.9rem',
              textDecoration: 'underline',
              cursor: 'pointer',
              color: 'grey',
            }}
            onClick={() => console.log('Remove item clicked')} // Add functionality for removing items
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
