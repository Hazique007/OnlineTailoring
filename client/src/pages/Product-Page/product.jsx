import React from "react";
import TopNav from "../../components/TopNav";
import Search from "../../components/Search";
import { FaFilter } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";
import ProductCart from "../../components/productCart";

const ProductPage = () => {
  return (
    <div>
      <TopNav />
      <div className="w-[100vw] justify-center px-[13px] pt-[11px] items-center ">
        <Search />
      </div>
      <div className="pl-[11px] pr-[11px]">
        <h1 className="font-[700] text-[14px]  mt-[17px] font-poppins text-[#737373] ">
          Men > Formal Shirts
        </h1>
        <p className="text-[#898282] font-[400] mt-[13px] text-[12px] pr-3 font-poppins">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
          natus beatae dolor sit amet consectetur adipisicing
        </p>
        <div className="filter-sort mt-[21px] flex items-center pl-[250px] gap-7 h-[22px]">
          <div className="flex h-[25px] gap-3  items-center">
            <p className="text-[#898282] font-[400]  text-[12px] font-poppins">
              Sort
            </p>
            <LuArrowDownUp color="#000" fontSize={14} />
          </div>
          <div className="flex h-[25px] gap-3 font-[400] text-[12px]  font-poppins items-center">
            <p className="text-[#898282] font-[400]  text-[12px] font-poppins">
              Filters
            </p>
            <FaFilter color="#000" fontSize={10} />
          </div>
        </div>
        <ProductCart />
      </div>
    </div>
  );
};

export default ProductPage;
