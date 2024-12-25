import React, { useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'




import HeaderPhotos from "../../../components/Headerphoto";


const LoginPage = () => {
  const [phone, setPhone] = useState("");
  

  return (
    <div className="h-[110px] w-full rounded-[5px] pb-78 ">
      <HeaderPhotos />

      <div className="bg-black h-fixed w-fixed overflow-hidden ">

<p className="text-white  text-[30px] font-[1000] font-poppins text-center ">
    <div className="pt-10">
      Doorstep Stitching 
      
      
      </div>
    </p>
    <p className="text-white  text-[18px] font-[200] font-poppins text-center ">
    
    welcome to the world of custom tailoring
      </p>

      <p className="text-white mt-10 font-[500] flex items-center">Mobile Number</p>
      <PhoneInput country={"in"} value={phone} onChange={setPhone} className="flex items-center" />

     



<div className="pt-40 pb-20">
<div className="flex items-center justify-center mt-10">
    <button
   
   
      className="bg-gradient-to-r from-[#9C3FE4]  to-[#C65647] hover:bg-blue-700 w-48 text-white font-bold py-2 px-4 rounded transition-transform transform active:scale-95"
     
    >
      Send Otp
   
    </button> 
  
    </div>
</div>









    </div>
    </div>
  );
};

export default LoginPage;
