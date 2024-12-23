import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Trending = () => {
  const [trendingItems, setTrendingItems] = useState([]);
  const navigate = useNavigate();

  const getTrendingImages = async () => {
    try {
      const { data } = await axios.get(
        "https://online-tailoring-1.onrender.com/api/v1/landing/getTrendingPageImages"
      );

      if (data && data.data.length > 0) {
        const items = data.data;

        while (items.length < 4) {
          items.push({ trendingImage: null, category: "Placeholder" });
        }

        setTrendingItems(items);
      }
    } catch (error) {
      console.error("Error fetching trending items:", error);
    }
  };

  const handleImageClick = (gender, category) => {
    navigate(`/product/${gender}/${category}`);
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
        {trendingItems.length > 0 ? (
          trendingItems.map((item, index) => (
            <div
              key={index}
              className="w-full cursor-pointer"
              onClick={() => handleImageClick(item.gender, item.category)}
            >
              {item.trendingImage ? (
                <img
                  className="h-[30vh] w-full object-cover rounded-lg"
                  src={`https://online-tailoring-1.onrender.com/uploads/${item.trendingImage}`}
                  alt={`Trending Image ${index + 1} - ${item.category}`}
                />
              ) : (
                <div className="h-[30vh] w-full bg-gray-300 rounded-lg flex items-center justify-center"></div>
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
