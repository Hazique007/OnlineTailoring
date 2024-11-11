import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const TopNav = () => {
  return (
    <div className="h-[46px] bg-gradient-to-r from-[#9C3FE4]  to-[#C65647] w-full flex items-center justify-between px-[8px]">
      <div className="flex items-center ">
        <IoIosArrowBack className="h-[16px] w-[16px] text-[#FFFFFF] font-[700]" />
        <p className="text-white leading-[24px] text-[16px] font-[500] font-poppins">
          Doorstep Stitching
        </p>
      </div>
      <p className="text-white leading-[18px] text-[12px] font-poppins font-[400] ">
        Search City
      </p>
    </div>
  );
};

export default TopNav;
