import React from "react";
import TopNav from "../../components/TopNav";
import Search from "../../components/Search";
import SearchStyle from "../../components/searchStyle";
import Navbar from "../../components/Navbar";
const SearchPage = ({ gender }) => {
  return (
    <div className="pb-20">
      <TopNav />
      <div className="w-full justify-center px-[13px] pt-[11px] items-center ">
        <Search />
        <SearchStyle gender={"Men"} />
        <SearchStyle gender={"Female"} />
        <SearchStyle gender={"Kids"} />
      </div>
      <Navbar />
    </div>
  );
};

export default SearchPage;
