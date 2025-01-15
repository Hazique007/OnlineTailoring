import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Trending = () => {
  const [trendingItems, setTrendingItems] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getTrendingImages = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/landing/getTrendingPageImages"
      );

      if (data.status !== "success") {
        navigate("/error");
      }

      if (data && data.data.length > 0) {
        const items = data.data;

        while (items.length < 4) {
          items.push({ trendingImage: null, category: "Placeholder" });
        }

        setTrendingItems(items);
      }
    } catch (error) {
      console.error("Error fetching trending items:", error);
      navigate("/error");
    }
  };

  // const getProductOnClickTrendingImages = async (gender, category) => {
  //   const response = await axios.get(
  //     "http://localhost:3000/api/v1/products/getGenderPlusCategory",
  //     {
  //       params: { gender, category },
  //     }
  //   );
  //   // console.log(response.data);
  //   setData(response.data.products);
  //   console.log(data);
  // };
  // useEffect(() => {
  //   getProductOnClickTrendingImages();
  // }, [gender, category]);

  const handleImageClick = async (gender, category) => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/stats/trackClick",
        {
          gender,
          category,
        }
      );
      navigate(`/TrendingProduct/${gender}/${category}`);
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  useEffect(() => {
    getTrendingImages();
  }, []);

  return (
    <div className="px-4 mt-10 h-auto rounded-lg">
      <h1 className="font-poppins ml-1 font-bold text-[12px] leading-[18px]">
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
                  className="h-[171px] w-[164px]  object-cover rounded-lg"
                  src={`http://localhost:3000/uploads/${item.trendingImage}`}
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
