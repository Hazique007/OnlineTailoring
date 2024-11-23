import React from "react";
// import { app } from "../../../firebase"
// import {getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import Input from "../../../components/InputForm"
import { IoPerson } from "react-icons/io5";
// import { IoSearch } from "react-icons/io5";

import HeaderPhotos from "../../../components/Headerphoto";


const LoginPage = () => {
  // const [phone, setPhone] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  // const auth = getAuth(app);


  // const setupRecaptcha = () => {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       "recaptcha-container",
  //       {
  //         size: "invisible",
  //         callback: () => {
  //           console.log("Recaptcha verified successfully");
  //         },
  //       },
  //       auth
  //     );
  //   }
  // };


  // const requestOTP = async () => {
  //   setError(""); // Clear previous errors
  //   setLoading(true);

  //   if (!phone || !/^\+\d{10,15}$/.test(phoneNumber)) {
  //     setError("Please enter a valid phone number with country code (e.g., +1234567890)");
  //     setLoading(false);
  //     return;
  //   }

  //   setupRecaptcha();
  //   const appVerifier = window.recaptchaVerifier;

  //   try {
  //     const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
  //     window.confirmationResult = confirmationResult; // Save confirmation for OTP verification
  //     onOtpRequested();
  //   } catch (err) {
  //     console.error(err);
  //     setError("Failed to send OTP. Please check your network and try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


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

      <p className="text-white mt-10">Mobile Number</p>

      <div className="h-[38px]  bg-[#F6F1F1] rounded-[5px] flex items-center mt-2">
<IoPerson  className="h-[20px] w-[40px] ml-[25px] text-gray-500" />
<input
  placeholder="Mobile Number"
  // value={phone}
  // onChange={e=>setPhone(e.target.value)}
  className="bg-transparent  outline-none font-poppins text-[11px] leading-[15px]"
  type="text"
/>
</div>

<div className="pt-40 pb-20">
<div className="flex items-center justify-center mt-10">
    <button
    // onClick={requestOTP}
    // disabled={loading}
    
   
      className="bg-gradient-to-r from-[#9C3FE4]  to-[#C65647] hover:bg-blue-700 w-48 text-white font-bold py-2 px-4 rounded transition-transform transform active:scale-95"
     
    >
      Send Otp
   {/* {loading ? "Sending..." : "Send OTP"} */}
      
    </button>
    {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}
    {/* <div id="recaptcha-container"></div> */}
    </div>
</div>









    </div>
    </div>
  );
};

export default LoginPage;
