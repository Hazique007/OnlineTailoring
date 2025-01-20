import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Fashion = () => {
  const [fashionImages, setFashionImages] = useState([]);
<<<<<<< HEAD
  const [error, setError] = useState(false);
=======
>>>>>>> 5c1d25b4698bbbca0647f2913e6267be934741d8
  const navigate = useNavigate();

  const fetchFashionImages = async () => {
    try {
      const { data } = await axios.get(
<<<<<<< HEAD
        "https://apna-darzi-samar.onrender.com/api/v1/landing/getFashionPageImages"
      );
      if (data.status !== "success") {
        navigate("/error");
      }
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
=======
        "https://apna-darzi-samar.onrender.com/api/v1/landing/getFashionPageImages"
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
>>>>>>> 5c1d25b4698bbbca0647f2913e6267be934741d8
      navigate("/error");
    }
  };

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
      navigate(`/FashionProduct/${gender}/${category}`);
<<<<<<< HEAD
    } catch (error) {
      console.error("Error tracking click:", error);
=======
    } catch (err) {
      console.error("Error tracking click:", err);
>>>>>>> 5c1d25b4698bbbca0647f2913e6267be934741d8
    }
  };

  useEffect(() => {
    fetchFashionImages();
  }, []);

<<<<<<< HEAD
  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Error loading fashion images. Please try again later.</p>
      </div>
    );
  }
=======
  const renderImage = (image) =>
    image.fashionImage ? (
      <img
        className="h-[45vw] w-[45vw] object-cover rounded-[10px]"
        src={`https://apna-darzi-samar.onrender.com/uploads/${image.fashionImage}`}
        alt={image.category || "Fashion Item"}
      />
    ) : (
      <div className="h-[30vh] w-full bg-gray-300 rounded-[10px] animate-pulse"></div>
    );
>>>>>>> 5c1d25b4698bbbca0647f2913e6267be934741d8

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
<<<<<<< HEAD
                    className="h-[171px] w-[164px] object-cover rounded-[10px]"
                    src={`https://apna-darzi-samar.onrender.com/uploads/${image.fashionImage}`}
=======
                    className="h-[45vw] w-[45vw] object-cover rounded-[10px]"
                    src={`https://apna-darzi-samar.onrender.com/uploads/${image.fashionImage}`}
>>>>>>> 5c1d25b4698bbbca0647f2913e6267be934741d8
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
