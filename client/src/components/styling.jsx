import { Link } from "react-router-dom";
import axios from "axios";
import StylingImageText from "./styling-img-text";
import { useEffect, useState } from "react";

export const DesignStyling = () => {
  return (
    <>
      <Styling gender="Male" heading="Men Styling" />
      <Styling gender="Female" heading="Women Styling" />
      {/* <Styling gender="Kids" heading="Kids Styling" /> */}
    </>
  );
};

const Styling = ({ heading, gender }) => {
  const [categoryArray, setCategoryArray] = useState([]);
 
  const getCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/category/fetchcategories",
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
            link={`/product/${gender}/${element.category}`}
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
