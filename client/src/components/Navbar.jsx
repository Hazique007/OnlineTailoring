import React from "react";
import { IoHome, IoCartOutline } from "react-icons/io5";
// import { IoMdCart } from "react-icons/io";

import { CiSearch } from "react-icons/ci";
import { PiSquaresFourBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

const TopNavIcon = ({ label, image }) => {
  return (
    <div className="flex flex-col items-center h-[62px] justify-center w-full">
      {image}
      <h2 className="text-[13px] font-poppins font-[600]">{label}</h2>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="Navigation h-[62px] bottom-0 fixed flex items-center justify-evenly bg-[#FAF1F1] w-full">
      <TopNavIcon
        label={"Home"}
        image={<IoHome className="h-[30px] w-[30px]" />}
      />
      <TopNavIcon
        label={"Search"}
        image={<CiSearch className="h-[30px] w-[30px]" />}
      />
      <TopNavIcon
        label={"Shop"}
        image={<PiSquaresFourBold className="h-[30px] w-[30px]" />}
      />
      <TopNavIcon
        label={"Cart"}
        image={<IoCartOutline className="h-[30px] w-[30px]" />}
      />
      <TopNavIcon
        label={"Profile"}
        image={<CgProfile className="h-[30px] w-[30px]" />}
      />
    </div>
  );
};

export default Navbar;
