import React from "react";
import { Link } from "react-router-dom";

const StylingImageText = ({ img, text, onClick, link }) => {
  return (
    <Link
      to={link}
      className="flex-col  rounded-sm items-center justify-center text-center "
    >
      <div className="bg-gray-200 shadow-md shadow-gray-400  p-2 rounded-md hover:bg-white">
        <img
          onClick={onClick}
          className="w-[30px]  h-[30px]"
          src={img}
          alt=""
        />
      </div>
      <p className="text-[10px] mt-1 font-[400] leading-[15px] font-poppins">
        {text}
      </p>
    </Link>
  );
};

export default StylingImageText;
