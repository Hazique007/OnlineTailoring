import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios to handle the API call
import TopNav from "../../components/TopNav";
import styleImage from "../../assets/images/Anime-T-shirts.png";
import Navbar from "../../components/Navbar";
import { BiSolidCommentDetail } from "react-icons/bi";
import { MdArrowForwardIos } from "react-icons/md";
import C1 from "../../assets/images/c1.png";
import C2 from "../../assets/images/Hexagon.png";
import C3 from "../../assets/images/c3.png";
import C4 from "../../assets/images/c4.png";

const Customize = () => {
  const productItem = JSON.parse(localStorage.getItem("productItem"));
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    pockets: "Single Pocket",
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleProceed = async () => {
    // Prepare the order data from localStorage and formValues
    // const orderData = {
    //   category: productItem.category,
    //   categoryDescription: productItem.description,
    //   colors: [formValues.threadColor, formValues.buttonColor],
    //   customizationOptions: JSON.stringify(formValues), // Serialize the form values as string
    //   description: productItem.description,
    //   fabric: productItem.fabric,
    //   gender: productItem.gender,
    //   images: productItem.images,
    //   isCustomized: true,
    //   name: productItem.name,
    //   price: productItem.price,
    //   sizes: productItem.sizes,
    //   stock: productItem.stock,
    //   subCategory: productItem.subCategory,
    //   userID:localStorage.getItem("userID"),
    //   productID:productItem._id,
    // };

    // console.log("Id" ,localStorage.getItem("userID"));
    // console.log(orderData);

    // try {
    //   // Make a POST request to the backend to create the order
    //   const response = await axios.post("http://localhost:3000/orders/create", orderData);

    //   // If successful, navigate to the order summary page
    //   console.log("Order created successfully", response.data);

    navigate("/ordersummary");
    // } catch (error) {
    //   console.error("Error creating order:", error);
    // }
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
    pocket: ["No Pocket", "Single Pocket", "Double Pocket"],
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
    { label: "Pockets", key: "pocket" },
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
  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + productItem.images.length) % productItem.images.length
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % productItem.images.length
    );
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

          <div className="relative w-[359px] h-[282px] overflow-hidden rounded-[10px] px-4">
            <img
              src={`http://localhost:3000/uploads/${productItem.images[currentImageIndex]}`}
              alt="Customize clothing"
              className="w-full h-full object-fit"
            />
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
            >
              &#8249;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
            >
              &#8250;
            </button>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="font-poppins font-[600] text-[16px]">
            About {productItem.subCategory}
          </h2>
          <p className="font-poppins font-[400] text-[13px] mt-1 text-gray-600">
            {productItem.description}
          </p>
        </div>
        <div className=" mt-[31px] bg-[#F1F1F180] rounded-[10px] p-4">
          <div className="flex w-full justify-between ">
            <h1 className="text-[16px] font-[700] font-poppins mb-2">
              Customize Your Style With:
            </h1>
            {/* <span
              onClick={() => setShow(!show)}
              className={`text-[12px] text-[#1043F9] font-[400] font-poppins cursor-pointer`}
            >
              Edit Details
            </span> */}
          </div>
          {/* <p className="text-[13px] font-poppins">
            If you need specific customizations in your apparel, you can share
            the same with our tailor guru once he comes to your place for taking
            measurements. Our expert tailor will take note of all the required
            customizations during home visit and ensure these are catered to in
            the best manner.
          </p> */}
          <div className="flex flex-col gap-6 pt-5">
            <div className="r1 flex justify-around items-center ">
              <div className="flex flex-col items-start gap-1">
                <img src={C1} className="c1 w-[25px] h-[25px]"></img>
                <p className="text-[#AA3DF3] font-[700] text-[12px]">Style</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <img src={C2} className="c2 w-50px] h-[50px]"></img>
                <p className="text-[#10E36C] font-[700] text-[12px]">
                  Look and Feel
                </p>
              </div>
            </div>
            <div className="r2 flex justify-around items-center">
              <div className="flex flex-col items-center justify-center gap-1">
                <img src={C3} className="c3 w-[25px] h-[25px]"></img>
                <p className="text-[#0099FF] text-[12px] font-[700]">
                  Thread Colours
                </p>
              </div>
              <div className=" flex flex-col items-center gap-1">
                <img src={C4} className="c3 w-[25px] h-[25px]"></img>
                <p className="text-[#FE6126] text-[12px] font-[700]">
                  Other Customizations
                </p>
              </div>
            </div>
            <p className="text-[12px] font-poppins italic font-[400] px-[13px] text-center">
              You can share all your customization needs with our tailor expert
              when he comes to take measurements.
            </p>
          </div>
          {/* {!show ? (
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
          )} */}
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
