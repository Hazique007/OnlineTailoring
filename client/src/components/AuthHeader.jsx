import React from "react";
import image10 from "../assets/images/suit.png";

const AuthHeader = () => {
  return (
    <div className="images flex-col justify-between items-center">
      <img
        className="h-[80vh] w-full object-cover "
        src={image10}
        alt=""
        srcSet=""
      />
    </div>
  );
};

export default AuthHeader;
