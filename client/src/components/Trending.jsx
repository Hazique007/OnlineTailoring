import React from "react";
import image1 from "../assets/images/Anime-T-shirts.png";
import image2 from "../assets/images/men-menu-banner.png";
import image3 from "../assets/images/men-page-1.png";
import image4 from "../assets/images/images (1).png";

const Trending = () => {
  return (
    <div className="px-4 mt-10 h-auto rounded-lg">
      <h1 className="font-poppins ml-1 font-bold text-[14px] leading-[18px]">
        Trending
      </h1>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <img
          className="h-[30vh] w-full object-cover rounded-lg"
          src={image1}
          alt="Anime T-shirts"
        />
        <img
          className="h-[30vh] w-full object-cover rounded-lg"
          src={image2}
          alt="Men's Menu Banner"
        />
        <img
          className="h-[30vh] w-full object-cover rounded-lg"
          src={image3}
          alt="Men's Page 1"
        />
        <img
          className="h-[30vh] w-full object-cover rounded-lg"
          src={image4}
          alt="Additional Trending Image"
        />
      </div>
    </div>
  );
};

export default Trending;
