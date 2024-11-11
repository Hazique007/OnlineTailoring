import React from "react";

const StylingImageText = ({ img, text }) => {
  return (
    <div className="flex-col items-center justify-center text-center">
      <img className="w-[30px] h-[30px]" src={img} alt="" />
      <p className="text-[10px] font-[400] leading-[15px] font-poppins">
        {text}
      </p>
    </div>
  );
};

export default StylingImageText;
