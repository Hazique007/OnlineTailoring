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
  const [timer, setTimer] = useState(120); // 2-minute timer
  const [canResend, setCanResend] = useState(false); // Disable resend initially
  const navigate = useNavigate();

  // Timer logic to countdown every second
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true); // Enable resend OTP when timer reaches 0
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
    setLoading(true);

    try {
      const formattedPhone = "+" + phone;

      // Send OTP request to the backend API using fetch
      const response = await fetch('http://localhost:3000/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formattedPhone }),
      });

      const data = await response.json();

      if (data.success) {
        setLoading(false);
        setShowOtp(true); // Show OTP input after sending OTP
        toast.success('OTP sent successfully');
        setTimer(120); // Reset the timer
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
  const onOTPVerify = async () => {
    setLoading(true);
  
    try {
      const formattedPhone = "+" + phone;
      console.log('Verifying OTP...'); // Log start of verification
  
      // Make sure the phone and OTP are correct
      console.log('Phone:', phone);
      console.log('Entered OTP:', otp);
  
      const response = await fetch('http://localhost:3000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formattedPhone, otp: otp }),
      });
  
      const data = await response.json();
  
      console.log('OTP Verification Response:', data); // Log response from backend
  
      if (data.success) {
        toast.success('OTP verified successfully');
        navigate("/home"); // Redirect to home page on successful OTP verification
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
    setCanResend(false); // Disable resend button while sending the OTP again
    setTimer(120); // Reset the timer to 2 minutes

    try {
      const formattedPhone = "+" + phone;
      const response = await fetch('http://localhost:3000/api/send-otp', {
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
    <section className='items-center justify-center h-screen'>
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />

        <div className="h-[110px] w-full rounded-[5px] pb-78">
          <HeaderPhotos />
          <div className="bg-black h-[800px]">
            <p className="text-white text-[30px] font-[1000] font-poppins text-center pt-10">
              Doorstep Stitching
            </p>
            <p className="text-white text-[18px] font-[200] font-poppins text-center">
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
                <div className="flex justify-center items-center pt-10">
                  <PhoneInput country={"in"} value={phone} onChange={setPhone} />
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
  );
};

export default Otp;
