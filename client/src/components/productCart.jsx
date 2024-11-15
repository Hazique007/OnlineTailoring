import { useState, useRef, useEffect } from "react";
import { SlArrowRight } from "react-icons/sl";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import image1 from "../assets/images/imageNew.png";
import image2 from "../assets/images/images (1).png";
import image3 from "../assets/images/Lettering-T-shirts.png";
import DialogImage from "../assets/images/dialog-image.png";
import { useNavigate } from "react-router-dom";

const images = [image1, image2, image3];

function SimpleDialog({ open, onClose }) {
  const navigate = useNavigate();
  const [wantFabric, setWantFabric] = useState("");

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (wantFabric === "Fabric") {
      navigate("/fabric");
      onClose();
    } else if (wantFabric === "NoFabric") {
      navigate("/customize");
      onClose();
    }
  }, [wantFabric, navigate, onClose]);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      classes={{ paper: "p-4 rounded-lg text-center" }}
    >
      <div className="flex flex-col items-center space-y-4">
        <img
          className="h-14 w-14 object-cover rounded-full"
          src={DialogImage}
          alt="Dialog Image"
        />
        <DialogTitle className="font-bold text-lg text-gray-800">
          Would you like to proceed with Fabric Selection?
        </DialogTitle>
        <p className="text-gray-600 text-sm px-6">
          Click ‘Yes’ if you want to buy the cloth as well. Click ‘No’ if you
          already have the fabric, which we’ll pick up during measurements.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => setWantFabric("Fabric")}
            className="px-6 py-2 bg-[#C65647] text-white rounded-md font-medium shadow hover:bg-[#b2463d]"
          >
            ‘Yes’ I want to purchase the fabric
          </button>
          <button
            onClick={() => setWantFabric("NoFabric")}
            className="px-6 py-2 text-[#1043F9] border-none rounded-md font-medium hover:bg-blue-50"
          >
            ‘No’, I already have the fabric
          </button>
        </div>
      </div>
    </Dialog>
  );
}

const ProductCart = ({
  label,
  price = 500,
  styleName = "StyleName",
  gender,
  category,
  subCategory,
}) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageBoxRef = useRef(null);

  const scrollToImage = (index) => {
    const imageBox = imageBoxRef.current;
    if (imageBox) {
      imageBox.scrollTo({
        left: index * imageBox.offsetWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handleOnclick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (imageBoxRef.current) {
        const scrollLeft = imageBoxRef.current.scrollLeft;
        const width = imageBoxRef.current.offsetWidth;
        const newIndex = Math.round(scrollLeft / width);
        setCurrentIndex(newIndex);
      }
    };

    const imageBox = imageBoxRef.current;
    imageBox.addEventListener("scroll", handleScroll);

    return () => imageBox.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className="outer-box h-[40vh] w-[45vw] mb-16 rounded-lg p-2">
        <div
          ref={imageBoxRef}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="image-box h-[33vh] w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-lg"
        >
          {images.map((image, index) => (
            <img
              onClick={handleOnclick}
              key={index}
              className={`h-full w-full flex-shrink-0 object-cover rounded-lg snap-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg ${
                currentIndex === index ? "ring-2 ring-blue-500" : ""
              }`}
              src={image}
              alt={`Product ${index + 1}`}
            />
          ))}
        </div>
        <div className="dots flex justify-center mt-2 space-x-1">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => scrollToImage(index)}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-black" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
        <div className="text flex flex-col gap-2">
          <h2 className="text-[12px] font-semibold">{styleName}</h2>
          <p className="text-[12px] text-gray-600">Price: {price}</p>
          <h2 className="text-[12px] text-yellow-600">
            <div className="flex items-center gap-1">
              {" "}
              {gender} <SlArrowRight className="text-[8px]" /> {category}{" "}
              <SlArrowRight className="text-[8px]" /> {subCategory}
            </div>
          </h2>
        </div>
      </div>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
};

export default ProductCart;
