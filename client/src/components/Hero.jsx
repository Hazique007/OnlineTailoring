import React from "react";
import img from "../assets/images/Hero.png";

const Hero = () => {
  return (
    <div className="h-[182px] w-full  rounded-[5px] mt-[11px]">
      <img
        src={img}
        className="h-[182px] w-full rounded-[5px]"
        alt="Hero-image"
        srcSet=""
      />
    </div>
  );
};

export default Hero;
