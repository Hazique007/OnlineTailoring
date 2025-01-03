import React from "react";
import Navbar from "../../../components/Navbar";
import Search from "../../../components/Search";
import TopNav from "../../../components/TopNav";
import ListingComponent from "../adminComponents/listingcomponent";
const listingPage = () => {
  return (
    <div>
      <TopNav />
      <div className="px-[17px] mt-[12px] ">
        <Search />
      </div>
      <div className="buttons px-[23px] mt-[20px] flex justify-between">
        <button className="text-white h-[27px] w-[160px] bg-[#0A2481] border-[1px] rounded-[10px] text-[10px] font-poppins font-[400]">
          Create New Category
        </button>
        <button className="text-white h-[27px] w-[160px] bg-[#D4A706] border-[1px] rounded-[10px] text-[10px] font-poppins font-[400]">
          Create New Sub-Category
        </button>
      </div>
      <ListingComponent />
    </div>
  );
};

export default listingPage;
