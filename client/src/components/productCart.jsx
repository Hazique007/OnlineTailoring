import React, { useState, useRef, useEffect } from "react";
import image1 from "../assets/images/imageNew.png";
import image2 from "../assets/images/images (1).png";
import image3 from "../assets/images/Lettering-T-shirts.png";

const ProductCart = ({ label, price = 500, styleName = "StyleName" }) => {
  const handleOnclick = () => {
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageBoxRef = useRef(null);

  const images = [image1, image2, image3];

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
              onClick={handleOnclick}
              key={index}
              className="h-full w-full flex-shrink-0 object-cover rounded-lg snap-center"
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
          <h2 className="text-[12px] font-[600] font-poppins">{styleName}</h2>
          <p className="text-[12px] text-[#898282] font-[400] font-poppins">
            Price:{price}
          </p>
          <h2 className="font-[400] text-[12px] text-[#D4A706]">
            Men > Shirts > Formal
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
