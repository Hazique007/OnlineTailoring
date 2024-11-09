import React, { useState } from "react";
import TopNav from "../../components/TopNav";
import styleImage from "../../assets/images/Anime-T-shirts.png";
import Navbar from "../../components/Navbar";

const Customize = () => {
  const [pocket, setPocket] = useState("Single Pocket");
  const [sleeves, setSleeves] = useState("Full Sleeves");
  const [thread, setThread] = useState("White");
  const [collarStyle, setCollarStyle] = useState("Regular");
  const [collarStiffness, setCollarStiffness] = useState("Medium");
  const [collarButtons, setCollarButtons] = useState("Yes");
  const [buttonColor, setButtonColor] = useState("Black");
  const [cuffStyle, setCuffStyle] = useState("Round");
  const [cuffStiffness, setCuffStiffness] = useState("Soft");
  const [shirtLength, setShirtLength] = useState("Regular");
  const [show, setShow] = useState(false);

  return (
    <div>
      <TopNav />

      <div className="px-[11px] mt-[17px] pb-28">
        <h1 className="font-poppins font-[700] text-[14px] text-[#737373] ">
          Men > Formal Shirts > Style Name
        </h1>
        <div className="w-full text-center mt-[23px] gap-y-3 flex flex-col items-center justify-center">
          <h1 className="text-[17px] font-poppins font-[600] text-[#DA3A3A]">
            Customize
          </h1>
          <img
            className="rounded-[10px] h-[282px] w-[359px] "
            src={styleImage}
            alt="Customize clothing"
          />
        </div>
        <div className="h-[331px] mt-[31px] bg-[#F1F1F180] rounded-[10px] p-4">
          <div className="flex w-full justify-between ">
            <h1 className="text-[16px] font-[700] font-poppins">
              Decide Your Style
            </h1>
            <span
              onClick={() => setShow(!show)}
              className="text-[12px] text-[#1043F9] font-[400] font-poppins"
            >
              Edit Details
            </span>
          </div>
          {!show ? (
            <div className="details grid grid-cols-3 gap-5 mt-[24px] ">
              <p className="flex flex-col gap-y-2">
                <h2 className="font-[400] text-[12px] font-poppins">Pockets</h2>
                <span className="text-[#DA3A3A] font-[400] text-[12px] font-poppins">
                  {pocket}
                </span>
              </p>
              <p className="flex flex-col gap-y-2">
                <h2 className="font-[400] text-[12px] font-poppins">Sleeves</h2>
                <span className="text-[#DA3A3A] font-[400] text-[12px] font-poppins">
                  {sleeves}
                </span>
              </p>
              <p className="flex flex-col gap-y-2">
                <h2 className="font-[400] text-[12px] font-poppins">
                  Thread Colour
                </h2>
                <span className="text-[#DA3A3A] font-[400] text-[12px] font-poppins">
                  {thread}
                </span>
              </p>
              <p className="flex flex-col gap-y-2">
                <h2 className="font-[400] text-[12px] font-poppins">
                  Collar Style
                </h2>
                <span className="text-[#DA3A3A] font-[400] text-[12px] font-poppins">
                  {collarStyle}
                </span>
              </p>
              <p className="flex flex-col gap-y-2">
                <h2 className="font-[400] text-[12px] font-poppins">
                  Collar Stiffness
                </h2>
                <span className="text-[#DA3A3A] font-[400] text-[12px] font-poppins">
                  {collarStiffness}
                </span>
              </p>
              <p className="flex flex-col gap-y-2">
                <h2 className="font-[400] text-[12px] font-poppins">
                  Collar Buttons
                </h2>
                <span className="text-[#DA3A3A] font-[400] text-[12px] font-poppins">
                  {collarButtons}
                </span>
              </p>
              <p className="flex flex-col gap-y-2">
                <h2 className="font-[400] text-[12px] font-poppins">
                  Button Colour
                </h2>
                <span className="text-[#DA3A3A] font-[400] text-[12px] font-poppins">
                  {buttonColor}
                </span>
              </p>
              <p className="flex flex-col gap-y-2">
                <h2 className="font-[400] text-[12px] font-poppins">
                  Cuff Style
                </h2>
                <span className="text-[#DA3A3A] font-[400] text-[12px] font-poppins">
                  {cuffStyle}
                </span>
              </p>
              <p className="flex flex-col gap-y-2">
                <h2 className="font-[400] text-[12px] font-poppins">
                  Cuff Stiffness
                </h2>
                <span className="text-[#DA3A3A] font-[400] text-[12px] font-poppins">
                  {cuffStiffness}
                </span>
              </p>
              <p className="flex flex-col gap-y-2">
                <h2 className="font-[400] text-[12px] font-poppins">
                  Shirt Length
                </h2>
                <span className="text-[#DA3A3A] font-[400] text-[12px] font-poppins">
                  {shirtLength}
                </span>
              </p>
            </div>
          ) : null}
        </div>
        <div className="w-full flex justify-center mt-9">
          <button className=" bg-gradient-to-r from-[#9C3FE4]  to-[#C65647] text-white font-poppins text-[17px] font-[500] rounded-[15px] w-[314px] h-[50px] text-center">
            Proceed
          </button>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Customize;
