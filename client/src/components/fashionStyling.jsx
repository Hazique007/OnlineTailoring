import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Fashion = () => {
  const [fashionImages, setFashionImages] = useState([]);
  const navigate = useNavigate();

  const fetchFashionImages = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/landing/getFashionPageImages"
      );
      if (data.status !== "success") {
        navigate("/error");
        return;
      }
      const images = data.data;
      const placeholders = Array.from(
        { length: 8 - images.length },
        (_, i) => ({
          fashionImage: null,
          category: "Placeholder",
          gender: "Unknown",
          _id: `placeholder-${i}`,
        })
      );

      setFashionImages([...images, ...placeholders]);
    } catch (err) {
      console.error("Error fetching fashion images:", err);
      navigate("/error");
    }
  };

  const handleImageClick = async (gender, category) => {
    try {
      await axios.post("http://localhost:3000/api/v1/stats/trackClick", {
        gender,
        category,
      });
      navigate(`/FashionProduct/${gender}/${category}`);
    } catch (err) {
      console.error("Error tracking click:", err);
    }
  };

  useEffect(() => {
    fetchFashionImages();
  }, []);

  const renderImage = (image) =>
    image.fashionImage ? (
      <img
        className="h-[45vw] w-[45vw] object-cover rounded-[10px]"
        src={`http://localhost:3000/uploads/${image.fashionImage}`}
        alt={image.category || "Fashion Item"}
      />
    ) : (
      <div className="h-[30vh] w-full bg-gray-300 rounded-[10px] animate-pulse"></div>
    );

  return (
    <div className="px-[15px] mt-10 rounded-[10px]">
      <h1 className="font-poppins ml-[6px] font-[700] text-[12px] leading-[18px]">
        Fashion and Style Highlights
      </h1>

      <div className="images grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {fashionImages.length > 0 ? (
          fashionImages.map((image, index) => (
            <div
              key={image._id || `image-${index}`}
              className="w-full cursor-pointer"
              onClick={() =>
                handleImageClick(image.gender || "Unknown", image.category)
              }
            >
              {image.fashionImage ? (
                <>
                  <img
                    className="h-[45vw] w-[45vw] object-cover rounded-[10px]"
                    src={`http://localhost:3000/uploads/${image.fashionImage}`}
                    alt={image.category}
                  />
                </>
              ) : (
                <div className="h-[30vh] w-full bg-gray-300 rounded-[10px] animate-pulse"></div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center w-full">Loading images...</p>
        )}
      </div>
    </div>
  );
};

export default Fashion;
