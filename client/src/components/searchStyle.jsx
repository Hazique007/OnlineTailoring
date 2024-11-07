import React from "react";
import { Link } from "react-router-dom";

const SearchStyle = ({ gender }) => {
  // Dynamic label based on gender
  const Label = gender
    ? `${gender.charAt(0).toUpperCase() + gender.slice(1)}`
    : "Unisex";

  return (
    <div className="pl-[15px] mt-[20px] w-full">
      <h1 className="font-[700] text-[14px] font-poppins">{Label} Styles</h1>
      <div className="clothingType flex w-[65vw] mt-[15px] justify-evenly h-[ 30vh]">
        <div className="col1">
          <h2 className="text-[#DA3A3A] font-[600] font-poppins text-[13px] ">
            Shirts
          </h2>
          <ul className=" flex flex-col justify-evenly h-[25vh] pl-[22px] mt-[5px]">
            <Link
              className=" font-poppins font-[400] text-[12px]  hover:text-[#DA3A3A] hover:underline "
              to="#"
            >
              Formal
            </Link>
            <Link className=" font-poppins font-[400] text-[12px] hover:text-[#DA3A3A] hover:underline" to="#">
              Semi-Formal
            </Link>
            <Link className=" font-poppins font-[400] text-[12px] hover:text-[#DA3A3A] hover:underline" to="#">
              Casual
            </Link>
            <Link className=" font-poppins font-[400] text-[12px] hover:text-[#DA3A3A] hover:underline" to="#">
              Mandarin
            </Link>
            <Link className=" font-poppins font-[400] text-[12px] hover:text-[#DA3A3A] hover:underline" to="#">
              Half-Sleeves
            </Link>
          </ul>
        </div>

        <div className="col2">
          <h2 className="text-[#DA3A3A] font-[600] font-poppins text-[13px]">
            Pants
          </h2>
          <ul className=" flex flex-col justify-evenly h-[25vh] pl-[22px] mt-[5px] ">
            <Link className=" font-poppins font-[400] text-[12px] hover:text-[#DA3A3A] hover:underline" to="#">
              Formal
            </Link>
            <Link className=" font-poppins font-[400] text-[12px] hover:text-[#DA3A3A] hover:underline" to="#">
              Semi-Formal
            </Link>
            <Link className=" font-poppins font-[400] text-[12px] hover:text-[#DA3A3A] hover:underline" to="#">
              Casual
            </Link>
            <Link className=" font-poppins font-[400] text-[12px] hover:text-[#DA3A3A] hover:underline" to="#">
              Mandarin
            </Link>
            <Link className=" font-poppins font-[400] text-[12px] hover:text-[#DA3A3A] hover:underline" to="#">
              Half-Sleeves
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchStyle;
