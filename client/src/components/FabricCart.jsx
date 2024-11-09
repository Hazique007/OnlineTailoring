import React, { useState, useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import image1 from "../assets/images/imageNew.png";
import image2 from "../assets/images/images (1).png";
import image3 from "../assets/images/Lettering-T-shirts.png";
import DialogImage from "../assets/images/dialog-image.png";
import { useNavigate } from "react-router-dom";

const images = [image2, image3, image1];

const FabricCart = ({ label, price = 500, FabricName = "FabricName" }) => {
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
      <div className="outer-box h-[32vh] w-[45vw] mb-16 rounded-lg p-2">
        <div
          ref={imageBoxRef}
          className="image-box h-[28vh] w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-lg"
        >
          {images.map((image, index) => (
            <img
              key={index}
              className="h-full w-full flex-shrink-0 object-cover rounded-lg snap-center cursor-pointer"
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
          <h2 className="text-[12px] font-semibold">{FabricName}</h2>
          <p className="text-[12px] text-gray-600">Price: {price}</p>
          <h2 className="text-[12px] text-yellow-600">
            Men > Shirts > Formal >Fabric
          </h2>
        </div>
      </div>
    </div>
  );
};

export default FabricCart;
