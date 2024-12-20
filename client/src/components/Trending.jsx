import React, { useEffect, useState } from "react";
import axios from "axios";

const Trending = () => {
  const [trendingImages, setTrendingImages] = useState([]);

  const getTrendingImages = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/landing/getTrendingPageImages"
      );
      if (data && data.data.length > 0) {
        const images = data.data[data.data.length - 1].trendingImages;

        while (images.length < 4) {
          images.push(null);
        }

        setTrendingImages(images);
      }
    } catch (error) {
      console.error("Error fetching trending images:", error);
    }
  };

  useEffect(() => {
    getTrendingImages();
  }, []);

  return (
    <div className="px-4 mt-10 h-auto rounded-lg">
      <h1 className="font-poppins ml-1 font-bold text-[14px] leading-[18px]">
        Trending
      </h1>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {trendingImages.length > 0 ? (
          trendingImages.map((image, index) => (
            <div key={index} className="w-full">
              {image ? (
                <img
                  className="h-[30vh] w-full object-cover rounded-lg"
                  src={`http://localhost:3000/uploads/${image}`}
                  alt={`Trending Image ${index + 1}`}
                />
              ) : (
                <div className="h-[30vh] w-full bg-gray-300 rounded-lg"></div>
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

export default Trending;
