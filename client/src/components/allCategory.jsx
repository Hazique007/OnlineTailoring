import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const AllCategory = () => {
  const [categories, setCategories] = useState({
    male: [],
    female: [],
  });

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const maleResponse = await axios.get(
        "https://online-tailoring-3.onrender.com/api/v1/category/fetchcategories",
        { params: { gender: "Male" } }
      );

      const femaleResponse = await axios.get(
        "https://online-tailoring-3.onrender.com/api/v1/category/fetchcategories",
        { params: { gender: "Female" } }
      );

      setCategories({
        male: maleResponse.data.categories || [],
        female: femaleResponse.data.categories || [],
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (link) => {
    navigate(link);
  };

  return (
    <div className="bg-gray-50 py-8 pb-20">
      <div className="container mx-auto px-6 md:px-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          All Categories
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Men's Categories */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-300 pb-2">
              Men's Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.male.length > 0 ? (
                categories.male.map((category) => (
                  <div
                    key={category._id}
                    onClick={() =>
                      handleCategoryClick(`/product/Male/${category.category}`)
                    }
                    className="group relative bg-gray-100 p-3 rounded-lg shadow hover:shadow-md transform transition-all duration-200 hover:scale-105 cursor-pointer"
                  >
                    <img
                      src={`https://online-tailoring-3.onrender.com/uploads/${category.categoryImages}`}
                      alt={`${category.category}`}
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                    <p className="text-sm font-medium text-gray-700 mt-3 text-center group-hover:text-blue-600">
                      {category.category}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  Loading categories for Men.
                </p>
              )}
            </div>
          </div>

          {/* Women's Categories */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-300 pb-2">
              Women's Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.female.length > 0 ? (
                categories.female.map((category) => (
                  <div
                    key={category._id}
                    onClick={() =>
                      handleCategoryClick(
                        `/product/Female/${category.category}`
                      )
                    }
                    className="group relative bg-gray-100 p-3 rounded-lg shadow hover:shadow-md transform transition-all duration-200 hover:scale-105 cursor-pointer"
                  >
                    <img
                      src={`https://online-tailoring-3.onrender.com/uploads/${category.categoryImages}`}
                      alt={`${category.category}`}
                      className="w-16 h-16 object-contain mx-auto rounded"
                    />
                    <p className="text-sm font-medium text-gray-700 mt-3 text-center group-hover:text-pink-500">
                      {category.category}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  Loading categories for Women.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default AllCategory;
