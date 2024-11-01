import React from "react";
import { IoHome, IoCartOutline } from "react-icons/io5";
// import { IoMdCart } from "react-icons/io";

import { IoSearch } from "react-icons/io5";
import { PiSquaresFourBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

export const TopNavIcon = ({ label, image }) => {
  return (
    <div className="flex flex-col items-center h-[62px] justify-center w-full">
      {image}
      <h2 className="text-[13px] font-poppins font-[450]">{label}</h2>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="Navigation h-[62px] bottom-0 fixed flex items-center justify-evenly bg-[#FAF1F1] w-full">
      <TopNavIcon
        label={"Home"}
        image={<IoHome className="h-[25px] w-[25px]" />}
      />
      <TopNavIcon
        label={"Search"}
        image={<IoSearch className="h-[25px] w-[25px]" />}
      />
      <TopNavIcon
        label={"Shop"}
        image={<PiSquaresFourBold className="h-[25px] w-[25px]" />}
      />
      <TopNavIcon
        label={"Cart"}
        image={<IoCartOutline className="h-[25px] w-[25px]" />}
      />
      <TopNavIcon
        label={"Profile"}
        image={<CgProfile className="h-[25px] w-[25px]" />}
      />
    </div>
  );
};

export default Navbar;
