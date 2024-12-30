import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import OtpInput from 'otp-input-react';
import { CgSpinner } from "react-icons/cg";
import 'react-phone-input-2/lib/style.css';
import toast, { Toaster } from 'react-hot-toast';

import HeaderPhotos from "../../../components/Headerphoto";
import PhoneInput from "react-phone-input-2";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [timer, setTimer] = useState(60); // 1-minute timer
  const [canResend, setCanResend] = useState(false); 
  const navigate = useNavigate();

  // Timer logic to countdown every second
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true); 
    } else {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  // Format timer as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Send OTP function (API call using fetch)
  const onSignup = async () => {
    if (phone.length !== 12) { 
      toast.error("Please enter a valid 10-digit mobile number.");
      return; 
    }

    setLoading(true);

    try {
      const formattedPhone = "+" + phone;
      const response = await fetch('https://doorsteptailoring-hazique.onrender.com/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formattedPhone }),
      });

      const data = await response.json();

      if (data.success) {
        setLoading(false);
        setShowOtp(true); 
        toast.success('OTP sent successfully');
        setTimer(60); // Reset the timer to 1 minute
      } else {
        setLoading(false);
        toast.error('Failed to send OTP');
      }
    } catch (error) {
      console.error("Error during OTP send:", error);
      setLoading(false);
      toast.error('Failed to send OTP. Please try again.');
    }
  };

  // Verify OTP function (API call using fetch)
  // const onOTPVerify = async () => {
  //   setLoading(true);

  //   try {
  //     const formattedPhone = "+" + phone;
  //     const response = await fetch('https://doorsteptailoring-hazique.onrender.com/api/verify-otp', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ phoneNumber: formattedPhone, otp: otp }),
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       // Store user ID in localStorage
  //       localStorage.setItem("userID", data.user._id);
  //       console.log(data);

  //       toast.success('OTP verified successfully');
  //       navigate("/home"); 
  //     } else {
  //       toast.error('Invalid OTP. Please try again.');
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("Error during OTP verification:", error);
  //     setLoading(false);
  //     toast.error('Something went wrong. Please try again.');
  //   }
  // };

  // Modify the onOTPVerify function to update userID after successful login
const onOTPVerify = async () => {
  setLoading(true);

  try {
    const formattedPhone = "+" + phone;
    const response = await fetch('https://doorsteptailoring-hazique.onrender.com/api/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber: formattedPhone, otp: otp }),
    });

    const data = await response.json();

    if (data.success) {
      // Store the new user ID in localStorage
      localStorage.setItem("userID", data.user._id); // Update userID
      console.log(data);

      toast.success('OTP verified successfully');
      navigate("/home"); 
    } else {
      toast.error('Invalid OTP. Please try again.');
      setLoading(false);
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    setLoading(false);
    toast.error('Something went wrong. Please try again.');
  }
};


  // Resend OTP function
  const resendOtp = async () => {
    setCanResend(false); 
    setTimer(60); // Reset the timer to 1 minute

    try {
      const formattedPhone = "+" + phone;
      const response = await fetch('https://doorsteptailoring-hazique.onrender.com/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formattedPhone }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('OTP resent successfully');
      } else {
        toast.error('Failed to resend OTP');
      }
    } catch (error) {
      console.error("Error during OTP resend:", error);
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="h-screen">
       <section className='items-center justify-center  '>
      <div className="flex flex-col ">
        <Toaster toastOptions={{ duration: 2000 }} />

        <div className="h-screen w-full rounded-[10px] ">
          <HeaderPhotos />
          <div className="bg-black h-[580px]">
            <p className="text-white text-[32px] font-[1000] font-poppins text-center pt-10">
              Doorstep Stitchings
            </p>
            <p className="text-gray-300 text-[12px] font-[200] font-poppins text-center">
              Welcome to the world of custom tailoring
            </p>

            {showOtp ? (
              <>
                <p className="text-white text-center pt-10 text-[12px]">
                  Verification OTP is sent to your mobile number
                </p>

                <div className="flex justify-center items-center pt-10">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    autoFocus
                    otpType="number"
                    disabled={false}
                    className="otp-container"
                  />
                </div>

                <p className="text-white text-center pt-10">
                  Didn’t receive the OTP?
                </p>
                <p
                  className={`text-${canResend ? 'blue' : 'gray'}-600 text-center pt-2 cursor-pointer`}
                  onClick={canResend ? resendOtp : null}
                  style={{ pointerEvents: canResend ? 'auto' : 'none' }}
                >
                  Resend OTP
                </p>

                <p className="text-white text-center pt-2">{formatTime(timer)}</p> 

                <div className="flex items-center justify-center mt-10">
                  <button
                    onClick={onOTPVerify}
                    className="bg-gradient-to-r from-[#9C3FE4] to-[#C65647] hover:bg-blue-700 w-48
                      text-white font-bold py-2 px-4 rounded transition-transform transform active:scale-95 
                      items-center justify-center flex gap-1"
                  >
                    {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                    <span>Verify</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center p-4 py-5 mt-5">
                  <PhoneInput
                  placeholder="Mobile number"
                    country={'in'}
                    value={phone}
                    onChange={setPhone}
                    onlyCountries={['in']}
                  />
                </div>

                <div className="flex items-center justify-center mt-10">
                  <button
                    onClick={onSignup}
                    className="bg-gradient-to-r from-[#9C3FE4] to-[#C65647] hover:bg-blue-700 w-48
                      text-white font-bold py-2 px-4 rounded transition-transform transform active:scale-95 
                      items-center justify-center flex gap-1"
                  >
                    {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                    <span>Send OTP</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>

    </div>
   
  );
};

export default Otp;
