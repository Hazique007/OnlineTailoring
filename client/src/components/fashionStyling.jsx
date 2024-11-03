import React from "react";
import image1 from "../assets/images/Anime-T-shirts.png";
import image2 from "../assets/images/men-menu-banner.png";
import image3 from "../assets/images/men-page-1.png";
import image4 from "../assets/images/images (1).png";
import images5 from "../assets/images/Lettering-T-shirts.png";
import images6 from "../assets/images/imageNew.png";
import images7 from "../assets/images/imageNew2.png";

const Fashion = () => {
  return (
    <div className="px-[15px] mt-10  rounded-[10px]">
      <h1 className="font-poppins ml-[6px] font-[700] text-[12px] leading-[18px]">
        Fashion and Style Highlights
      </h1>

      <div className="images flex-col justify-between items-center">
        <div className="row1 mt-4 flex justify-between items-center">
          <img
            className="h-[30vh] w-[43vw] object-cover rounded-[10px]"
            src={images7}
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
        <div className="row2 mt-4 flex justify-between items-center">
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
        <div className="row3 mt-4 flex justify-between items-center">
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
        <div className="row4 mt-4 flex justify-between items-center">
          <img
            className="h-[30vh] w-[43vw] object-cover rounded-[10px]"
            src={images5}
            alt=""
            srcSet=""
          />
          <img
            className="h-[30vh] w-[43vw] object-cover rounded-[10px]"
            src={images6}
            alt=""
            srcSet=""
          />
        </div>
      </div>
    </div>
  );
};

export default Fashion;
