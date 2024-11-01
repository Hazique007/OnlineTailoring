import React from "react";
import image1 from "../assets/images/Anime-T-shirts.png";
import image2 from "../assets/images/men-menu-banner.png";
import image3 from "../assets/images/men-page-1.png";
import image4 from "../assets/images/images (1).png";

const Trending = () => {
  return (
    <div className="px-[15px] mt-10 h-[390px] rounded-[10px]">
      <h1 className="font-poppins ml-[6px] font-[700] text-[12px] leading-[18px]">
        Trending
      </h1>

      <div className="images flex-col justify-between items-center">
        <div className="row1 mt-4 flex justify-between items-center">
          <img
            className="h-[30vh] w-[43vw] object-cover rounded-[10px]"
            src={image1}
            alt=""
            srcSet=""
          />
          <img
            className="h-[30vh] w-[43vw] object-cover rounded-[10px]"
            src={image2}
            alt=""
            srcSet=""
          />
        </div>
        <div className="row2 mt-4 flex justify-between items-center">
          <img
            className="h-[30vh] w-[43vw] object-cover rounded-[10px]"
            src={image3}
            alt=""
            srcSet=""
          />
          <img
            className="h-[30vh] w-[43vw] object-cover rounded-[10px]"
            src={image4}
            alt=""
            srcSet=""
          />
        </div>
      </div>
    </div>
  );
};

export default Trending;
