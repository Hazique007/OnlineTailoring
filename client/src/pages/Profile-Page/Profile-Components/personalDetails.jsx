import React, { useState, useEffect } from "react";
import TopNav from "../../../components/TopNav";
import { FiCamera } from "react-icons/fi";

const API_BASE_URL = "http://localhost:3000";

const PersonalDetails = () => {
  const [profile, setProfile] = useState({
    name: "",
    mobileNumber: "",
    gender: "",
    age: "",
    emailAddress: "",
    profilePicture: "",
  });
  const [originalProfile, setOriginalProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/listpersonal`);
        if (!response.ok) throw new Error("Failed to fetch profile data");
        const data = await response.json();
        const user = data[0];
        if (user) {
          setProfile(user);
          setOriginalProfile(user);
          setId(user._id);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e, key) => {
    setProfile({ ...profile, [key]: e.target.value });
  };

  const validateFields = () => {
    if (!profile.name.trim()) return "Name is required";
    if (profile.name.length > 100) return "Name cannot exceed 100 characters";
    if (!profile.mobileNumber.trim() || profile.mobileNumber.length !== 10)
      return "Valid 10-digit mobile number is required";
    if (!profile.gender) return "Gender is required";
    if (!profile.age || isNaN(profile.age) || profile.age < 18 || profile.age > 100)
      return "Age must be between 18 and 100";
    if (
      !profile.emailAddress.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.emailAddress)
    )
      return "Valid email address is required";
    return "";
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const errorMessage = validateFields();
    if (errorMessage) {
      window.alert(errorMessage);
      return;
    }

    setIsEditing(false);
    setShowAlert(true);

    try {
      if (id) {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        });
        if (!response.ok) throw new Error("Failed to update profile");
        console.log("Profile updated successfully");
        setOriginalProfile(profile); // Update original profile on successful save
      } else {
        console.error("No user ID found");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleCancelClick = () => {
    setProfile(originalProfile); // Revert to original profile data
    setIsEditing(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile({ ...profile, profilePicture: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="font-poppins">
      <TopNav />
      <h1 className="font-poppins font-[700] text-[14px] text-[#737373] pt-4 pl-4 ">
        Personal details
      </h1>
      <div className="p-8 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          {isEditing ? (
            <>
              <input
                type="file"
                accept="image/*"
                id="profile-picture"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleProfilePictureChange}
              />
              <FiCamera className="absolute bottom-2 right-2 text-white bg-gray-800 rounded-full p-1 text-xl" />
            </>
          ) : null}
          {profile.profilePicture ? (
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <p className="text-gray-500">Add Photo</p>
          )}
        </div>

        {/* Details Form */}
        <div className="w-full max-w-md grid grid-cols-2 gap-4 pt-10">
          <label className="text-gray-700 self-center">Name</label>
          <input
            type="text"
            value={profile.name}
            maxLength={100}
            onChange={(e) => handleInputChange(e, "name")}
            disabled={!isEditing}
            className={`p-2 border rounded-lg ${
              isEditing ? "bg-white" : "bg-gray-200"
            }`}
          />

          <label className="text-gray-700 self-center">Mobile Number</label>
          <input
            type="text"
            value={profile.mobileNumber}
            onChange={(e) => handleInputChange(e, "mobileNumber")}
            disabled={!isEditing}
            className={`p-2 border rounded-lg ${
              isEditing ? "bg-white" : "bg-gray-200"
            }`}
          />

          <label className="text-gray-700 self-center">Gender</label>
          <select
            value={profile.gender}
            onChange={(e) => handleInputChange(e, "gender")}
            disabled={!isEditing}
            className={`p-2 border rounded-lg ${
              isEditing ? "bg-white" : "bg-gray-200"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label className="text-gray-700 self-center">Age</label>
          <input
            type="number"
            value={profile.age}
            onChange={(e) => handleInputChange(e, "age")}
            disabled={!isEditing}
            className={`p-2 border rounded-lg ${
              isEditing ? "bg-white" : "bg-gray-200"
            }`}
            min={18}
            max={100}
          />

          <label className="text-gray-700 self-center">Email Address</label>
          <input
            type="email"
            value={profile.emailAddress}
            onChange={(e) => handleInputChange(e, "emailAddress")}
            disabled={!isEditing}
            className={`p-2 border rounded-lg ${
              isEditing ? "bg-white" : "bg-gray-200"
            }`}
          />
        </div>

        {/* Edit/Save and Cancel Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={isEditing ? handleSaveClick : handleEditClick}
            className={`px-6 py-2 text-red-500 rounded-md bg-transparent border border-red-500 ${
              isEditing ? "hover:bg-red-500 hover:text-white" : ""
            }`}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          {isEditing && (
            <button
              onClick={handleCancelClick}
              className="px-6 py-2 text-gray-500 rounded-md bg-transparent border border-gray-500 hover:bg-gray-500 hover:text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Alert Dialog */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Success</h2>
            <p>Your profile has been updated successfully!</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowAlert(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;
