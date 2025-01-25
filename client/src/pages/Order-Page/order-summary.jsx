import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShowSummary from "../../components/ShowSummary";
import Navbar from "../../components/Navbar";
import TopNav from "../../components/TopNav";
import SummaryBox from "../../components/Summarybox";
import Pickup from "../../components/pickup";
import Delivery from "../../components/deliverydetails";
import Works from "../../components/Works";
import OrderSummaryCard from "../../components/orderShowCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderSummary = ({}) => {
  const navigate = useNavigate();
  const [showSummary, setShowSummary] = useState(true);
  const summarySectionRef = useRef(null);
  const productItem = JSON.parse(localStorage.getItem("productItem"));
  const [addresses, setAddresses] = useState([]);

  const [formValues, setFormValues] = useState({
    pocket: "Single Pocket",
    sleeves: "Full Sleeves",
    threadColor: "White",
    buttonColor: "Black",
    collarStyle: "Regular",
    collarStiffness: "Medium",
    collarButton: "Zero",
    neckButton: "Yes",
    placket: "Standard",
    cuffStyle: "Round",
    cuffStiffness: "Soft",
    bottomCut: "Straight",
    shirtLength: "Regular",
  });
  const userID = localStorage.getItem("userID");

  // Fetch addresses when component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "https://apnadarzi-5.onrender.com/getAddressByUser",
          {
            params: { userID },
          }
        );

        if (response.data && response.data.data) {
          setAddresses(response.data.data);
        } else {
          console.error("No addresses found for this user");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [userID]);

  const handlePlaceOrder = async () => {
    if (!productItem) {
      toast.error("No product item data found. Please try again.");
      return;
    }

    if (!userID) {
      toast.error("No user ID found. Please login again.");
      return;
    }

    if (
      !addresses ||
      addresses.length === 0 ||
      !localStorage.getItem("selectedAddress")
    ) {
      toast.error("Please select an address .");
      return;
    }

    const orderData = {
      category: productItem.category,
      categoryDescription: productItem.description,
      colors: [formValues.threadColor, formValues.buttonColor],
      customizationOptions: JSON.stringify(formValues),
      description: productItem.description,
      fabric: productItem.fabric,
      gender: productItem.gender,
      images: productItem.images,
      isCustomized: true,
      name: productItem.name,
      price: productItem.price,
      sizes: productItem.sizes,
      stock: productItem.stock,
      subCategory: productItem.subCategory,
      userID: userID,
    };

    try {
      const response = await axios.post(
        "https://apnadarzi-5.onrender.com/orders/create",
        orderData
      );
      navigate("/orderplaced");
    } catch (error) {
      toast.error(
        "An error occurred while placing the order. Please try again."
      );
    }
  };

  const handleRemoveOrder = async (orderId) => {
    try {
      await axios.delete(`https://apnadarzi-5.onrender.com/orders/${orderId}`);
      alert("Order removed successfully.");
      // Update UI by removing the order from the list
      const updatedOrders = orders.filter((order) => order._id !== orderId);
      setOrders(updatedOrders);
    } catch (error) {
      alert("Failed to remove order. Please try again.");
    }
  };

  const handleProceed = () => {
    setShowSummary(true);
  };

  useEffect(() => {
    if (showSummary && summarySectionRef.current) {
      summarySectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showSummary]);

  return (
    <div className="pb-20 font-poppins">
      <TopNav />
      <div className="mt-4 pb-5 space-y-5">
        {showSummary ? (
          <div ref={summarySectionRef}>
            <p className="text-center pt-5 pb-5 text-[#DA3A3A] text-[18px] font-[600]">
              Order Summary
            </p>
            <ShowSummary />
            <OrderSummaryCard onRemoveOrder={handleRemoveOrder} />
            <Pickup />
            <Delivery />
            <Works />
            <div className="flex items-center justify-center mt-6 pt-10">
              <button
                onClick={handlePlaceOrder}
                className="w-[280px] h-[45px] bg-gradient-to-r from-[#9C3FE4] to-[#C65647] hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded-lg transition-transform transform active:scale-95"
              >
                Place Order
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="font-[600] text-[12px] text-[#737373]">
              Men {">"} Formal Shirts {">"} Style Name
            </h1>
            <p className="text-center pt-6 text-[#DA3A3A] text-[16px] font-[600]">
              Appointment and Fabric Pick Up
            </p>
            <div className="bg-[#f5f5f5] p-4 rounded-md mt-4">
              <SummaryBox />
            </div>
            <Pickup />
            <Delivery />
            <div className="px-5">
              <Works />
            </div>
            <div className="flex items-center justify-center px-5">
              <button
                onClick={handleProceed}
                className="w-[280px] h-[45px] bg-gradient-to-r from-[#9C3FE4] to-[#C65647] hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded-lg transition-transform transform active:scale-95"
              >
                Proceed
              </button>
            </div>
          </div>
        )}
        <Navbar />
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderSummary;
