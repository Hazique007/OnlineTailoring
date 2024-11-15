import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StylingImageText from "./styling-img-text";
import StyleImg from "../assets/images/t-shirt mockup.png";
import StyleImg1 from "../assets/images/t-shirt.png";

export const DesignStyling = ({ gender }) => {
  return (
    <>
      <Styling gender="Male" heading="Men Styling" />
      <Styling gender="Female" heading="Women Styling" />
      <Styling gender="Kids" heading="Kids Styling" />
    </>
  );
};

const Styling = ({ heading, gender }) => {
  

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
      <div className="images flex w-full mt-3 px-[19px] justify-between px-13">
        <StylingImageText
          
          link={`/product/${gender}/Shirts`}
          text="Shirts"
          img={StyleImg1}
        />
        <StylingImageText
          text="Pants"
          img={StyleImg}
          link={`/product/${gender}/Pants`}
        />
        <StylingImageText
          text="Blazers"
          link={`/product/${gender}/Blazers`}
          img={StyleImg}
        />
        <StylingImageText
          text="Suits"
          img={StyleImg}
          link={`/product/${gender}/Suits`}
        />
        <StylingImageText
          link={`/product/${gender}/Kurtas`}
          text="Kurtas"
          img={StyleImg}
        />
      </div>
    </div>
  );
};

export default DesignStyling;
