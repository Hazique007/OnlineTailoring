import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Fashion = () => {
  const [fashionImages, setFashionImages] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const fetchFashionImages = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/landing/getFashionPageImages"
      );

      const images = data.data;

      while (images.length < 8) {
        images.push({
          fashionImage: null,
          category: "Placeholder",
          gender: "Unknown",
          _id: `placeholder-${images.length}`,
        });
      }

      setFashionImages(images);
    } catch (error) {
      console.error("Error fetching fashion images:", error);
      setError(true);
    }
  };

  const handleImageClick = (gender, category) => {
    navigate(`/product/${gender}/${category}`);
  };

  useEffect(() => {
    fetchFashionImages();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Error loading fashion images. Please try again later.</p>
      </div>
    );
  }

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
                    className="h-[30vh] w-full object-cover rounded-[10px]"
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
