import React , { useState }from "react";

import HeaderPhotos from "../../../components/Headerphoto"
// import OtpHeading from "../../../components/OtpHeading"

const Otp = ()=> {
    // const [otp, setOtp] = useState("");
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState(false);
  
    // const verifyOTP = async () => {
    //   setError("");
    //   setLoading(true);

    //   const confirmationResult = window.confirmationResult;
    // if (!confirmationResult) {
    //   setError("OTP request not found. Please go back and request a new OTP.");
    //   setLoading(false);
    //   return;
    // }
    //   if (!otp || otp.length !== 6) {
    //     setError("Please enter a valid 6-digit OTP.");
    //     return;
    //   }
  
    //   try {
    //     const result = await confirmationResult.confirm(otp);
    //     console.log("User signed in:", result.user);
    //     onLoginSuccess(); // Navigate to the home page
    //   } catch (err) {
    //     console.error(err);
    //     setError("Invalid OTP. Please try again.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
  
    // if (success) {
    //   return <h1 className="text-center text-2xl">Login Successful!</h1>;
    // }


return(

   <div div className="h-[110px] w-full rounded-[5px] pb-78 ">

<HeaderPhotos />
<div className="bg-black h-[800px]">

        <p className="text-white  text-[30px] font-[1000] font-poppins text-center ">
            <div className="pt-10">
              Doorstep Stitching 
              
              
              </div>
            </p>
            <p className="text-white  text-[18px] font-[200] font-poppins text-center ">
            
            welcome to the world of custom tailoring
              </p>

              <p className="text-white text-center pt-10 text-[12px]">
              Verification OTP is sent on Mobile Number 
              User’s Mobile Number



              </p>

              <p className="text-white pt-10 pl-10">Otp</p>
              <div className="h-[38px]  bg-[#F6F1F1] rounded-[5px] flex items-center mt-2">
              <input
      placeholder="Enter Otp"
     
      className="bg-transparent  outline-none font-poppins text-[11px] leading-[15px] pl-10"
      type="text"
    />
    </div>

    <p className="text-white text-center pt-10">
    Didn’t receive the OTP?


    </p>

    <a href="www.google.com"><p className="text-blue-600 text-center pt-2">
    Resend OTP


    </p></a>

    <div className="flex items-center justify-center mt-10">
        <button
        
       
          className="bg-gradient-to-r from-[#9C3FE4]  to-[#C65647] hover:bg-blue-700 w-48 text-white font-bold py-2 px-4 rounded transition-transform transform active:scale-95"
         
        >
         
          
        </button>
        
        </div>







              </div>




    </div>


)



};

export default Otp;