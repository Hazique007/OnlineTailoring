import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TopNav from "../../../components/TopNav";
import Search from "../../../components/Search";
import { toast } from "react-toastify";

const EditCategory = () => {
  const { gender, category, subCategory } = useParams();
  const [details, setDetails] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // New state for image
  const [previewImage, setPreviewImage] = useState(null); // For image preview

  // Get product details
  const getDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/products/GenderCategory",
        {
          params: { gender, category },
        }
      );
      setDetails(response.data.products[0]);
      setPreviewImage(response.data.products[0]?.image); // Set the current image for preview
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Error fetching product details.");
    }
  };

  // Toggle edit mode
  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Preview selected image
  };

  // Handle update request
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("gender", details.gender);
      formData.append("category", details.category);
      formData.append("categoryDescription", details.categoryDescription);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await axios.put(
        "http://localhost:3000/api/v1/products/UpdateGenderCategory",
        formData,
        {
          params: { gender, category, subCategory },
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast.success("Product updated successfully!");
        getDetails();
        setIsEdit(false);
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again.");
    }
  };

  useEffect(() => {
    getDetails();
  }, [gender, category]);

  return (
    <div className="pb-10">
      <TopNav />
      <div className="px-[17px] mt-[12px]">
        <Search />
      </div>
      <div className="flex justify-between px-[30px] mt-[23px]">
        <h1 className="text-[14px] font-[600] font-poppins">
          {details.gender} - {details.category}
        </h1>

        {!isEdit ? (
          <button
            onClick={handleEdit}
            className={`${
              !isEdit ? "bg-[#D4A706] text-white" : "text-[#1043F9] bg-white"
            } px-4 py-1 rounded-sm text-[12px] h-[27px] font-poppins font-[400]`}
          >
            {isEdit ? "Cancel" : "Edit"}
          </button>
        ) : null}
      </div>

      {/* Product Details */}
      <div className="all Details">
        {/* Gender */}
        <div className="each-item flex flex-col px-[35px] mt-[20px] gap-[10px]">
          <label
            className="text-[12px] font-[700] font-poppins"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
            disabled={!isEdit}
            id="gender"
            name="gender"
            value={details.gender || ""}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="General">General</option>
          </select>
        </div>

        {/* Category */}
        <div className="each-item flex flex-col px-[35px] mt-[20px] gap-[10px]">
          <label
            className="text-[12px] font-[700] font-poppins"
            htmlFor="category"
          >
            Category
          </label>
          <input
            className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
            disabled={!isEdit}
            type="text"
            id="category"
            name="category"
            value={details.category || ""}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="each-item flex flex-col px-[35px] mt-[20px] gap-[10px]">
          <label
            className="text-[12px] font-[700] font-poppins"
            htmlFor="categoryDescription"
          >
            Description
          </label>
          <input
            className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
            disabled={!isEdit}
            type="text"
            id="categoryDescription"
            name="categoryDescription"
            value={details.categoryDescription || ""}
            onChange={handleChange}
          />
        </div>

        {/* Image */}
        <div className="each-item flex flex-col px-[35px] mt-[20px] gap-[10px]">
          <label
            className="text-[12px] font-[700] font-poppins"
            htmlFor="image"
          >
            Image
          </label>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-[100px] h-[100px] object-cover rounded-md"
            />
          )}
          <input
            className="font-[400] text-[12px] font-poppins border-[1px] border-[#737373] rounded-[10px] h-[27px] px-[10px] mt-[5px]"
            disabled={!isEdit}
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {isEdit && (
        <div className="flex justify-center items-center">
          <button
            onClick={handleSave}
            className="font-[400] text-[12px] bg-[#D4A706] text-white w-[200px] h-[27px] rounded-[10px] mt-[30px] self-center"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditCategory;
