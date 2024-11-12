import React from "react";
import { Link } from "react-router-dom";

const StylingImageText = ({ img, text, onClick, link }) => {
  return (
    <Link
      to={link}
      className="flex-col items-center justify-center text-center "
    >
      <img onClick={onClick} className="w-[30px] h-[30px]" src={img} alt="" />
      <p className="text-[10px] font-[400] leading-[15px] font-poppins">
        {text}
      </p>
    </Link>
  );
};

export default StylingImageText;
