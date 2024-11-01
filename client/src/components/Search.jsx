import React from "react";
import { IoSearch } from "react-icons/io5";
const Search = () => {
  return (
    <div className="h-[38px]  bg-[#F6F1F1] rounded-[5px] flex items-center">
      <IoSearch className="h-[20px] w-[20px] ml-[25px] text-gray-500" />
      <input
        placeholder="Search Shearwani"
        className="bg-transparent  pl-[20px] outline-none font-poppins text-[11px] leading-[15px]"
        type="text"
      />
    </div>
  );
};

export default Search;
