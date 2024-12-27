import React, { useState, useEffect } from "react";
import TopNav from "../../components/TopNav";
import Navbar from "../../components/Navbar";
import {
  FaAddressBook,
  FaShoppingBag,
  FaUser,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000"; // Replace with your API base URL

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/listpersonal`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        const userData = data[0]; // Assuming the first object in the array is the user
        if (userData) {
          setUser({
            name: userData.name,
            phone: userData.mobileNumber,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/otp");
  };

  const options = [
    {
      label: "My Addresses",
      icon: <FaAddressBook className="text-purple-500 text-xl" />,
      onClick: () => navigate("/addresses"),
    },
    {
      label: "My Orders",
      icon: <FaShoppingBag className="text-green-500 text-xl" />,
      onClick: () => navigate("/orders"),
    },
    {
      label: "Personal Details",
      icon: <FaUser className="text-blue-500 text-xl" />,
      onClick: () => navigate("/personal-details"),
    },
    {
      label: "Help and Support",
      icon: <FaQuestionCircle className="text-yellow-500 text-xl" />,
      onClick: () => navigate("/help-support"),
    },
    {
      label: "Settings",
      icon: <FaCog className="text-gray-500 text-xl" />,
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <div className="mb-10">
      <TopNav />

      <div className="px-[11px] mt-[17px] pb-10">
        <h1 className="font-poppins font-[700] text-[14px] text-[#737373]">
          Profile
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto"></div>

      {/* User Card */}
      <div className="p-2 ">
        <div
          className="w-full p-8 rounded-[15px] text-white"
          style={{
            background: "linear-gradient(90deg, #171617 0%, #94908F 100%)",
          }}
        >
          <h2 className="text-lg font-semibold">{user.name || "Loading..."}</h2>
          <p className="text-sm text-gray-300">{user.phone || "Loading..."}</p>
        </div>
      </div>

      <div className="w-full mx-auto mt-8 bg-white  rounded-lg">
        {options.map((option, index) => (
          <div key={index}>
            <div
              onClick={option.onClick}
              className="flex items-center py-4 px-6 cursor-pointer hover:bg-gray-100 transition duration-200"
            >
              {option.icon}
              <span className="ml-4 text-lg text-gray-800">{option.label}</span>
            </div>
            {index < options.length - 1 && <hr className="border-gray-300" />}
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="flex justify-center mt-6">
        <p
          onClick={handleLogout}
          className="text-[#1043F9] cursor-pointer text-lg font-medium hover:underline"
        >
          Log Out
        </p>
      </div>
      <Navbar />
    </div>
  );
};

export default ProfilePage;
