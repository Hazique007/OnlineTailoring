import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../../components/TopNav";
import styleImage from "../../assets/images/Anime-T-shirts.png";
import Navbar from "../../components/Navbar";
import { BiSolidCommentDetail } from "react-icons/bi";
import { MdArrowForwardIos } from "react-icons/md";

const Customize = () => {
  const productItem = JSON.parse(localStorage.getItem("productItem"));
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    pocket: "Single Pocket",
    sleeves: "Full Sleeves",
    thread: "White",
    collarStyle: "Regular",
    collarStiffness: "Medium",
    collarButton: "Zero",
    neckButton: "Yes",
    buttonColor: "Black",
    threadColor: "White",
    placket: "Standard",
    cuffStyle: "Round",
    cuffStiffness: "Soft",
    bottomCut: "Straight",
    shirtLength: "Regular",
  });
  const [show, setShow] = useState(false);
  const handleProceed = () => {
    navigate("/ordersummary");

    console.log(formValues);
  };
  const options = {
    collarStyle: [
      "Spread Collar",
      "Prince Charlie",
      "Madmen",
      "Bandhgala",
      "Polo",
      "Mandarin",
    ],
    collarStiffness: ["Soft", "Medium", "Stiff"],
    neckButton: ["Yes", "No"],
    collarButton: ["Zero", "One", "Two"],
    buttonColor: ["Black", "White", "Red", "Blue"],
    threadColor: ["White", "Black", "Gray", "Blue"],
    placket: ["Standard", "Hidden", "Covered"],
    pockets: ["No Pocket", "Single Pocket", "Double Pocket"],
    sleeves: ["Full Sleeves", "Half Sleeves"],
    cuffStyle: ["Single Button Cuff", "French Cuff", "Double Button Cuff"],
    cuffStiffness: ["Soft", "Stiff", "Double Stiff"],
    bottomCut: ["Straight", "Curved"],
    shirtLength: ["Short", "Regular", "Long"],
  };

  const config = [
    { label: "Collar Style", key: "collarStyle" },
    { label: "Collar Stiffness", key: "collarStiffness" },
    { label: "Neck Button", key: "neckButton" },
    { label: "Collar Button", key: "collarButton" },
    { label: "Button Color", key: "buttonColor" },
    { label: "Thread Color", key: "threadColor" },
    { label: "Placket", key: "placket" },
    { label: "Pockets", key: "pockets" },
    { label: "Sleeves", key: "sleeves" },
    { label: "Cuff Style", key: "cuffStyle" },
    { label: "Cuff Stiffness", key: "cuffStiffness" },
    { label: "Bottom Cut", key: "bottomCut" },
    { label: "Shirt Length", key: "shirtLength" },
  ];

  const handleSelectChange = (key, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  return (
    <div>
      <TopNav />

      <div className="px-[11px] mt-[17px] pb-24">
        <h1 className="font-poppins font-[700] flex gap-1 items-center text-[14px] text-[#737373] ">
          {productItem.gender === "Male" ? "Men" : "Women"}{" "}
          <MdArrowForwardIos /> {productItem.category} <MdArrowForwardIos />{" "}
          {productItem.subCategory}
        </h1>
        <div className="w-full text-center mt-[23px] gap-y-3 flex flex-col items-center justify-center">
          <h1 className="text-[17px] font-poppins font-[600] text-[#DA3A3A]">
            Customize
          </h1>
          <img
            className="rounded-[10px] h-[282px] object-fit w-[359px] "
            src={styleImage}
            alt="Customize clothing"
          />
        </div>
        <div className="mt-4">
          <h2 className="font-poppins font-[600] text-[16px]">
            About {productItem.subCategory}
          </h2>
          <p className="font-poppins font-[400] text-[13px] mt-1 text-gray-600">
            {" "}
            {productItem.description}
          </p>
        </div>
        <div className=" mt-[31px] bg-[#F1F1F180] rounded-[10px] p-4">
          <div className="flex w-full justify-between ">
            <h1 className="text-[16px] font-[700] font-poppins mb-2">
              Decide Your Style
            </h1>
            <span
              onClick={() => setShow(!show)}
              className={`text-[12px] text-[#1043F9] font-[400] font-poppins cursor-pointer`}
            >
              Edit Details
            </span>
          </div>
          {!show ? (
            <div className="details grid grid-cols-3 gap-5 mt-[24px]  ">
              {config.map(({ label, key }) => (
                <div key={key} className="flex flex-col gap-y-2">
                  <h2 className="font-[400] text-[12px] font-poppins">
                    {label}
                  </h2>
                  <span className="text-[#DA3A3A] font-[400] text-[12px] font-poppins">
                    {formValues[key]}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4">
              {config.map(({ label, key }) => (
                <div
                  key={key}
                  className="w-full flex items-center justify-between mb-1 gap-2"
                >
                  <label className="font-poppins font-[400] text-[12px] text-[#737373] w-1/3">
                    {label}
                  </label>
                  <div className="flex items-center w-2/3">
                    <select
                      className="bg-[#FAF1F1] h-[24px] w-full pl-2 text-[#737373] text-[12px] font-poppins font-[400] rounded-md"
                      value={formValues[key]}
                      onChange={(e) => handleSelectChange(key, e.target.value)}
                    >
                      <option value="">{label}</option>
                      {options[key].map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <BiSolidCommentDetail className="text-gray-400 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className={`w-full flex justify-center ${show ? "mt-10" : "mt-10"}`}
        >
          <button
            onClick={handleProceed}
            className="bg-gradient-to-r from-[#9C3FE4] to-[#C65647] text-white font-poppins text-[17px] font-[500] rounded-[15px] w-[314px] h-[50px] text-center"
          >
            Proceed
          </button>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default Customize;
