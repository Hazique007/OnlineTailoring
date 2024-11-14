import React, { useContext } from "react";
import { Link } from "react-router-dom";
import StylingImageText from "./styling-img-text";
import StyleImg from "../assets/images/t-shirt mockup.png";
import StyleImg1 from "../assets/images/t-shirt.png";
import { SearchContext } from "../Context Api/searchContext";

export const DesignStyling = ({ gender }) => {
  return (
    <>
      {/* Pass specific heading and gender to Styling component */}
      <Styling gender="Male" heading="Men Styling" />
      <Styling gender="Female" heading="Women Styling" />
      <Styling gender="Kids" heading="Kids Styling" />
    </>
  );
};

const Styling = ({ heading, gender }) => {
  let { setQuery, query } = useContext(SearchContext);
  console.log(query);

  return (
    <div>
      <div className="pt-5 w-full flex justify-between px-[10px] mt-3">
        <h1 className="text-[12px] ml-[10px] font-poppins leading-[18px] font-[700]">
          {heading}
        </h1>
        <Link
          className="text-[12px] text-[#1043F9] leading-[15px]"
          onClick={() =>
            setQuery((prevQuery) => ({
              ...prevQuery,

              gender: gender,
            }))
          }
          to={`/product/${gender}`}
        >
          View All
        </Link>
      </div>
      <div className="images flex w-full mt-3 px-[19px] justify-between px-13">
        <StylingImageText
          onClick={() =>
            setQuery((prevQuery) => ({
              ...prevQuery,
              category: "Shirts",
              gender: gender,
            }))
          }
          link={`/products/${gender}/Shirts`}
          text="Shirts"
          img={StyleImg1}
        />
        <StylingImageText
          text="Pants"
          onClick={() => setQuery({ category: "Pants", gender })}
          img={StyleImg}
          link={`/products/${gender}/Pants`}
        />
        <StylingImageText
          text="Blazers"
          onClick={() => setQuery({ category: "Blazers", gender })}
          link={`/products/${gender}/Blazers`}
          img={StyleImg}
        />
        <StylingImageText
          text="Suits"
          onClick={() => setQuery({ category: "Suits", gender })}
          img={StyleImg}
          link={`/products/${gender}/Suits`}
        />
        <StylingImageText
          link={`/products/${gender}/Kurtas`}
          text="Kurtas"
          img={StyleImg}
          onClick={() => setQuery({ category: "Kurtas", gender })}
        />
      </div>
    </div>
  );
};

export default DesignStyling;
