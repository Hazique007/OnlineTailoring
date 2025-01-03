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

  // Handle update request
  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/products/UpdateGenderCategory",
        {
          gender: details.gender,
          category: details.category,
          categoryDescription: details.categoryDescription,
        },
        {
          params: { gender, category, subCategory },
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

  // Handle delete request
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/v1/products/CategoryDelete",
        {
          params: { gender, category },
        }
      );

      if (response.status === 200) {
        toast.success("Product deleted successfully!");
        window.history.back();
      } else {
        toast.error("Failed to delete the product. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(
        "An error occurred while deleting the product. Please try again."
      );
    }
  };

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle confirmation from the modal
  const confirmDelete = () => {
    handleDelete();
    closeModal();
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
              !isEdit ? "bg-[#D4A706] text-white" : "text-[#1043F9] bg-white "
            } px-4 py-1 rounded-sm text-[12px] h-[27px] font-poppins font-[400]`}
          >
            {isEdit ? "Cancel" : "Edit"}
          </button>
        ) : (
          ""
        )}
        {isEdit ? (
          <button
            onClick={openModal}
            className="text-[#1043F9] bg-white px-4 py-1 rounded-sm text-[12px] h-[27px] font-poppins font-[400]"
          >
            Delete
          </button>
        ) : (
          ""
        )}
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
            id="description"
            name="categoryDescription"
            value={details.categoryDescription || ""}
            onChange={handleChange}
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

      {/* Modal Confirmation */}
      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-[300px]">
            <h3 className="text-center text-lg font-semibold">
              Are you sure you want to delete this category?
            </h3>
            <div className="flex justify-between mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-black px-4 py-1 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCategory;
