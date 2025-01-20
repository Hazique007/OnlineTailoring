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
<<<<<<< HEAD
        "https://apna-darzi-samar.onrender.com/api/v1/landing/getTrendingPageImages"
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
=======
        "https://apna-darzi-samar.onrender.com/api/v1/landing/getTrendingPageImages"
      );
      console.log(data);

      if (data?.status !== "success") {
        navigate("/error");
        return;
      }

      const items = Array.isArray(data?.data) ? [...data.data] : [];
      while (items.length < 4) {
        items.push({ trendingImage: null, category: "Placeholder" });
      }

      setTrendingItems(items);
    } catch (error) {
      console.error("Error fetching trending items:", error);
      setTrendingItems([]);
>>>>>>> 5c1d25b4698bbbca0647f2913e6267be934741d8
      navigate("/error");
    }
  };

<<<<<<< HEAD
  // const getProductOnClickTrendingImages = async (gender, category) => {
  //   const response = await axios.get(
  //     "https://apna-darzi-samar.onrender.com/api/v1/products/getGenderPlusCategory",
=======
  // const getTrendingImages = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "https://apna-darzi-samar.onrender.com/api/v1/landing/getTrendingPageImages"
  //     );

  //     if (data.status !== "success") {
  //       navigate("/error");
  //     }

  //     if (data && data.data.length > 0) {
  //       const items = data.data;

  //       while (items.length < 4) {
  //         items.push({ trendingImage: null, category: "Placeholder" });
  //       }

  //       setTrendingItems(items);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching trending items:", error);
  //     navigate("/error");
  //   }
  // };

  // const getProductOnClickTrendingImages = async (gender, category) => {
  //   const response = await axios.get(
  //     "https://apna-darzi-samar.onrender.com/api/v1/products/getGenderPlusCategory",
>>>>>>> 5c1d25b4698bbbca0647f2913e6267be934741d8
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
<<<<<<< HEAD
        "https://apna-darzi-samar.onrender.com/api/v1/stats/trackClick",
=======
        "https://apna-darzi-samar.onrender.com/api/v1/stats/trackClick",
>>>>>>> 5c1d25b4698bbbca0647f2913e6267be934741d8
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
<<<<<<< HEAD

=======
      {/* //h-[171px] w-[164px] */}
>>>>>>> 5c1d25b4698bbbca0647f2913e6267be934741d8
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
<<<<<<< HEAD
                  className="h-[171px] w-[164px]  object-cover rounded-lg"
                  src={`https://apna-darzi-samar.onrender.com/uploads/${item.trendingImage}`}
=======
                  className="h-[45vw] w-[45vw]  object-cover rounded-lg"
                  src={`https://apna-darzi-samar.onrender.com/uploads/${item.trendingImage}`}
>>>>>>> 5c1d25b4698bbbca0647f2913e6267be934741d8
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
