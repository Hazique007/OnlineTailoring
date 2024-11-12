import React from "react";

import Submit from "../components/submitButton";

const OtpHeading = () => {
  return (
    <div className="bg-black h-[800px]">
      <p className="text-white  text-[30px] font-[1000] font-poppins text-center ">
        <div className="pt-10">Doorstep Stitching</div>
      </p>
      <p className="text-white  text-[18px] font-[200] font-poppins text-center ">
        welcome to the world of custom tailoring
      </p>

      <p className="text-white text-center pt-10 text-[12px]">
        Verification OTP is sent on Mobile Number User’s Mobile Number
      </p>

      <p className="text-white pt-10 pl-10">Otp</p>
      <div className="h-[38px]  bg-[#F6F1F1] rounded-[5px] flex items-center mt-2">
        <input
          placeholder="Enter Otp"
          className="bg-transparent  outline-none font-poppins text-[11px] leading-[15px] pl-10"
          type="text"
        />
      </div>

      <p className="text-white text-center pt-10">Didn’t receive the OTP?</p>

      <a href="www.google.com">
        <p className="text-blue-600 text-center pt-2">Resend OTP</p>
      </a>

      <Submit />
    </div>
  );
};
export default OtpHeading;
