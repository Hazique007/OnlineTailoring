import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader";

const AuthLanding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to redirect after 1.5 seconds
    const timer = setTimeout(() => {
      navigate("/otp"); // Redirect to the desired page
    }, 1500);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-black h-40 w-full">
        <p className="text-white text-center font-[1000] text-[30px] pt-10">
          Doorstep Stitching
        </p>
        <p className="text-white text-center font-[200] text-[18px]">
          welcome to the world of custom tailoring
        </p>
      </div>
      <AuthHeader />
    </div>
  );
};

export default AuthLanding;
