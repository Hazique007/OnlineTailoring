import React from "react";
// import Input from "../../../components/InputForm"
import { IoPerson } from "react-icons/io5";

import Submit from "../components/submitButton";



const LoginHeading = ()=> {

  

return(

    <div className="bg-black h-[800px]">

    <p className="text-white  text-[30px] font-[1000] font-poppins text-center ">
        <div className="pt-10">
          Doorstep Stitching 
          
          
          </div>
        </p>
        <p className="text-white  text-[18px] font-[200] font-poppins text-center ">
        
        welcome to the world of custom tailoring
          </p>

          <p className="text-white mt-10">Mobile Number</p>

          <div className="h-[38px]  bg-[#F6F1F1] rounded-[5px] flex items-center mt-2">
    <IoPerson  className="h-[20px] w-[40px] ml-[25px] text-gray-500" />
    <input
      placeholder="Mobile Number"
      className="bg-transparent  outline-none font-poppins text-[11px] leading-[15px]"
      type="text"
    />
  </div>

  <Submit />


  






        </div>
)





}

export default LoginHeading;