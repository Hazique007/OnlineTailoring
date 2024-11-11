import React from "react";
import { Link } from "react-router-dom";
import StylingImageText from "./styling-img-text";
import StyleImg from "../assets/images/t-shirt mockup.png";
import StyleImg1 from "../assets/images/t-shirt.png";

const Styling = ({ heading, img, text }) => {
  return (
    <div>
      <div className="pt-5 w-full flex justify-between px-[10px] mt-3">
        <h1 className="text-[12px] ml-[10px] font-poppins leading-[18px] font-[700] ">
          {heading}
        </h1>
        <Link className="text-[12px] text-[#1043F9] leading-[15px]" to={"/"}>
          View All
        </Link>
      </div>
      <div className="images flex w-full mt-3 px-[19px] justify-between px-13">
        <StylingImageText text={"Shirts"} img={StyleImg1} />
        <StylingImageText text={"Shirts"} img={StyleImg} />
        <StylingImageText text={"Pants"} img={StyleImg} />
        <StylingImageText text={"Blazers"} img={StyleImg} />
        <StylingImageText text={"Suits"} img={StyleImg} />
        <StylingImageText text={"Kurtas"} img={StyleImg} />
      </div>
    </div>
  );
};

export default Styling;
