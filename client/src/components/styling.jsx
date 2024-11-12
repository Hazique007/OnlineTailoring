import React from "react";
import { Link } from "react-router-dom";
import StylingImageText from "./styling-img-text";
import StyleImg from "../assets/images/t-shirt mockup.png";
import StyleImg1 from "../assets/images/t-shirt.png";

const Styling = ({ heading, img, text, onClick, link }) => {
  // const navigate = useNavigation();
  // const handleNavigate = (text) => {
  //   navigate(`/${text}`);
  // };
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
        <StylingImageText
          link={`${heading}/Shirts`}
          text={"Shirts"}
          img={StyleImg1}
        />
        <StylingImageText
          link={`${heading}/Pants`}
          text={"Pants"}
          img={StyleImg}
        />
        <StylingImageText
          link={`${heading}/Blazers`}
          text={"Blazers"}
          img={StyleImg}
        />
        <StylingImageText
          link={`${heading}/Suits`}
          text={"Suits"}
          img={StyleImg}
        />
        <StylingImageText
          link={`${heading}/Kurtas`}
          text={"Kurtas"}
          img={StyleImg}
        />
        {/* <StylingImageText
          link={`${heading}/Shirts`}
          text={"Shirts"}
          img={StyleImg}
        /> */}
      </div>
    </div>
  );
};

export default Styling;
