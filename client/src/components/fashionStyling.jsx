import React, { useEffect, useState } from "react";
import axios from "axios";

const Fashion = () => {
  const [fashionImages, setFashionImages] = useState([]);

  useEffect(() => {
    const fetchFashionImages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/landing/getFashionPageImages"
        );

        const images = data.data[data.data.length - 1].fashionImages;

        while (images.length < 8) {
          images.push(null);
        }

        setFashionImages(images);
      } catch (error) {
        console.error("Error fetching fashion images", error);
      }
    };

    fetchFashionImages();
  }, []);

  return (
    <div className="px-[15px] mt-10 rounded-[10px]">
      <h1 className="font-poppins ml-[6px] font-[700] text-[12px] leading-[18px]">
        Fashion and Style Highlights
      </h1>

      <div className="images flex flex-wrap justify-between items-center">
        {fashionImages.length > 0 ? (
          fashionImages.map((image, index) => (
            <div key={index} className="w-[48%] mt-4">
              {image ? (
                <img
                  className="h-[30vh] w-full object-cover rounded-[10px]"
                  src={`http://localhost:3000/uploads/${image}`}
                  alt={`fashion image ${index + 1}`}
                />
              ) : (
                <div className="h-[30vh] w-full bg-gray-300 rounded-[10px]"></div>
              )}
            </div>
          ))
        ) : (
          <p>Loading images...</p>
        )}
      </div>
    </div>
  );
};

export default Fashion;
