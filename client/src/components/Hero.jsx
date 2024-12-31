import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Hero = () => {
  const navigate = useNavigate();

  const [landingArray, setLandingArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const getLandingImages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/landing/getLandingPageImages"
      );
      if (data.status !== "success") {
        navigate("/error");
      }

      if (data) {
        const images = data.data.flatMap((item) => item.bannerImages);
        setLandingArray(images);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching landing images:", error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getLandingImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newIndex = Math.floor(scrollPosition / 300);
      if (newIndex < landingArray.length) {
        setCurrentIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [landingArray]);

  useEffect(() => {
    if (landingArray.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === landingArray.length - 1 ? 0 : prevIndex + 1
        );
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [landingArray]);

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };
  // const handleImageClick = (gender, category) => {
  //   navigate(`/product/${gender}/${category}`);
  // };
  const handleImageClick = async (gender, category) => {
    try {
      await axios.post("http://localhost:3000/api/v1/stats/trackClick", {
        gender,
        category,
      });
      navigate(`/product/${gender}/${category}`);
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };
  if (loading) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center">
        <BeatLoader color="#ff58e6" />
      </div>
    );
  }

  return (
    <div className="h-[182px] w-full mt-[11px] overflow-hidden">
      <div className="relative w-full">
        {landingArray.length > 0 ? (
          <div
            className="flex h-[182px] w-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {landingArray.map((image, index) => (
              <div key={index} className="w-full h-[182px] flex-shrink-0">
                <img
                  src={`http://localhost:3000/uploads/${image.image}`}
                  onClick={() => handleImageClick(image.gender, image.category)}
                  className="h-[182px] w-full rounded-[5px]"
                  alt={`Hero Image ${index + 1}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[182px] w-full bg-gray-300 rounded-[5px]"></div>
        )}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {landingArray.map((_, index) => (
            <div
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                index === currentIndex
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-400 hover:bg-blue-300 scale-75"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
