import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const SearchStyle = ({ gender }) => {
  const [maleData, setMaleData] = useState([]);
  const [femaleData, setFemaleData] = useState([]);

  const getSubCategoryMale = async () => {
    const response = await axios.get(
      "https://online-tailoring-3.onrender.com/api/v1/category/getGenderWiseCategory",
      {
        params: {
          gender: "Male",
        },
      }
    );
    setMaleData(response.data.data);
    // console.log(response.data.data);
  };

  const getSubCategoryFemale = async () => {
    const response = await axios.get(
      "https://online-tailoring-3.onrender.com/api/v1/category/getGenderWiseCategory",
      {
        params: {
          gender: "Female",
        },
      }
    );
    setFemaleData(response.data.data);
  };

  useEffect(() => {
    getSubCategoryMale();
    getSubCategoryFemale();
  }, [gender]);

  let lab =
    gender === "Male" ? "Men" : gender === "Female" ? "Women" : "Unisex";
  const Label = lab
    ? `${lab.charAt(0).toUpperCase() + lab.slice(1)} Styles`
    : "Unisex Styles";

  const renderCategory = (data) => {
    return data.map((item) => {
      const filteredProducts = item.products.filter(
        (product) => product.gender === gender
      );

      const uniqueSubCategories = [
        ...new Set(filteredProducts.map((product) => product.subCategory)),
      ];

      return (
        <div key={item.category} className="mb-6 ">
          <h2 className="text-[#DA3A3A] font-semibold text-md">
            {item.category}
          </h2>
          <ul className="pl-4 list-none">
            {uniqueSubCategories.map((subCategory) => (
              <li key={subCategory} className="mb-2">
                <Link
                  className="text-[13px] font-normal text-gray-700 hover:text-[#DA3A3A] hover:underline"
                  to={`/product/${gender}/${item.category}/${subCategory}`}
                >
                  {subCategory}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="pl-4 mt-5 w-full">
      <h1 className="font-bold text-lg">{Label}</h1>
      <div className="mt-5 flex flex-wrap gap-8">
        {gender === "Male" && (
          <div className="w-full grid grid-cols-2 sm:w-1/2 lg:w-1/3">
            {renderCategory(maleData)}
          </div>
        )}

        {gender === "Female" && (
          <div className="w-full grid grid-cols-2 sm:w-1/2 lg:w-1/3">
            {renderCategory(femaleData)}
          </div>
        )}

        {gender === "Unisex" && (
          <>
            <div className="w-full sm:w-1/2 lg:w-1/3">
              {renderCategory(maleData)}
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3">
              {renderCategory(femaleData)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchStyle;
