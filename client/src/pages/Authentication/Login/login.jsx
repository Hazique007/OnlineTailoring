import React from "react";
// import { IoSearch } from "react-icons/io5";

import HeaderPhotos from "../../../components/Headerphoto";
import LoginHeading from "../../../components/LoginHeading";

const LoginPage = () => {
  return (
    <div className="h-[110px] bg-black px w-full rounded-[5px] pb-78 ">
      <HeaderPhotos />
      <div className="px-3 bg-black">
        <LoginHeading />
      </div>
    </div>
  );
};

export default LoginPage;
