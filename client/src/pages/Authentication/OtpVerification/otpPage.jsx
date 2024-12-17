import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import OtpInput from 'otp-input-react'
import { CgSpinner } from "react-icons/cg"
import 'react-phone-input-2/lib/style.css'
import toast, { Toaster } from 'react-hot-toast';

import HeaderPhotos from "../../../components/Headerphoto"
import PhoneInput from "react-phone-input-2";
import { auth} from "../../../../src/firebase.config";
import {RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'


const Otp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const[user,setUser] =useState(null);
  const navigate =useNavigate();


  function onCaptchaVerify(){
if(!window.recaptchaVerifier){
  window.recaptchaVerifier = new RecaptchaVerifier( auth,'recaptcha-container', {
    'size': 'invisible',
    'callback': (response) => {
      console.log("reCAPTCHA verified")
      onSignup();
     
    },
    'expired-callback': () => {
     
    }
  });



}



  }

  function onSignup (){
    setLoading(true)
    onCaptchaVerify()
    
    

    const appVerifier = window.recaptchaVerifier
    const formatPhone = "+" + phone;

    signInWithPhoneNumber(auth, formatPhone, appVerifier)
    
    .then((confirmationResult) => {

     
      window.confirmationResult = confirmationResult;
      setLoading(false);
      console.log("reached");
      
      setShowOtp(true);
      toast.success('Otp Sent')
      
    }).catch((error) => {
      console.log(error);
      

//       grecaptcha.reset(window.recaptchaWidgetId);
//       window.recaptchaVerifier.render().then(function(widgetId) {
//      grecaptcha.reset(widgetId);
// });
      
      setLoading(false)
      
      
    });
  }


  // function onOTPVerify() {
  //   setLoading(true);
  //   window.confirmationResult
  //     .confirm(otp)
  //     .then(async (res) => {
  //       console.log(res);
  //       setUser(res.user);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }
  


  return (

    <section className=' items-center justify-center h-screen'>
      <div>
        <Toaster toastOptions={{duration :4000}} />
        <div
          id="recaptcha-container">
        </div>

        {
          user ? (navigate("/home")):
         (
          <div  className="h-[110px] w-full rounded-[5px] pb-78 ">

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
          
          
            {
              showOtp ?(
          
            <>
          
              <p className="text-white text-center pt-10 text-[12px]">
                Verification OTP is sent on Mobile Number
                User’s Mobile Number
          
          
          
              </p>
          
              <div className="flex justify-center items-center pt-10">
          
          
          
                <OtpInput
                  value={otp}
                  onChange={setOtp}
          
                  OTPLength={6}
                  autoFocus otpType="number"
                  disabled={false}
                  className="otp-container" >
          
                </OtpInput>
              </div>
          
          
              <p className="text-white text-center pt-10">
                Didn’t receive the OTP?
          
          
              </p>
          
              <a href="www.google.com"><p className="text-blue-600 text-center pt-2">
                Resend OTP
          
          
              </p></a>
          
              <div className="flex items-center justify-center mt-10">
                <button onClick={onOTPVerify}
                  className="bg-gradient-to-r from-[#9C3FE4]  to-[#C65647] hover:bg-blue-700 w-48
          text-white font-bold py-2 px-4 rounded transition-transform transform active:scale-95 
          items-center justify-center flex gap-1" >{
                    loading && <CgSpinner size={20} className="mt-1 animate-spin" />
                  }
          
                  <span>Verify</span>
          
          
                </button>
          
              </div>
          
          
          
          
          
          
            </> ):(
          
             <>
          
          
          
          <div className="flex justify-center items-center pt-10">
          <PhoneInput country={"in"} value={phone} onChange={setPhone}/>
          
          
          
          
          </div>
          
          
          
          
          
          
          
          
          <div className="flex items-center justify-center mt-10">
          <button onClick={onSignup}
          className="bg-gradient-to-r from-[#9C3FE4]  to-[#C65647] hover:bg-blue-700 w-48
          text-white font-bold py-2 px-4 rounded transition-transform transform active:scale-95 
          items-center justify-center flex gap-1" >{
          loading && <CgSpinner size={20} className="mt-1 animate-spin" />
          }
          
          <span>Send OTP</span>
          
          
          </button>
          
          </div>
          
          
          
          
          
          
             </>)
          
          
            }
          
          
          
          
            
          
           
          
           
          
          
          
          
          
          
          
          
          </div>
          
          
          
          
                </div>
         )



        }
      




      </div>
      




    </section>


  )



};

export default Otp;