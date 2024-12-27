import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StylingImageText from "./styling-img-text";
import { useEffect, useState } from "react";

export const DesignStyling = () => {
  return (
    <>
      <Styling gender="Male" heading="Men Styling" />
      <Styling gender="Female" heading="Women Styling" />
      {/* Uncomment if needed */}
      {/* <Styling gender="Kids" heading="Kids Styling" /> */}
    </>
  );
};

const Styling = ({ heading, gender }) => {
  const [categoryArray, setCategoryArray] = useState([]);
  const navigate = useNavigate();
  // console.log(categoryArray);

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "https://online-tailoring-3.onrender.com/api/v1/category/fetchcategories",
        {
          params: { gender },
        }
      );

      if (response.data.categories) {
        setCategoryArray(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, [gender]);

  const handleImageClick = async (gender, category) => {
    try {
      await axios.post(
        "https://online-tailoring-3.onrender.com/api/v1/stats/trackClick",
        {
          gender,
          category,
        }
      );
      console.log("Clicked");

      navigate(`/product/${gender}/${category}`);
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  return (
    <div>
      <div className="pt-5 w-full flex justify-between px-[10px] mt-3">
        <h1 className="text-[12px] ml-[10px] font-poppins leading-[18px] font-[700]">
          {heading}
        </h1>
        <Link
          className="text-[12px] text-[#1043F9] leading-[15px]"
          to={`/product/${gender}`}
        >
          View All
        </Link>
      </div>
      <div className="images flex w-full mt-3 px-[19px] justify-between">
        {categoryArray.map((element) => (
          <StylingImageText
            key={element._id}
            onClick={() => handleImageClick(element.gender, element.category)}
            text={element.category}
            img={element.categoryImages}
            alt={`${element.category} image`}
          />
        ))}
      </div>
    </div>
  );
};

export default DesignStyling;
