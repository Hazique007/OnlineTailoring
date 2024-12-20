import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import StylingImageText from "./styling-img-text";

const CategoryPage = () => {
  const { gender } = useParams();
  const [categoryArray, setCategoryArray] = useState([]);

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/category/fetchcategories",
        {
          params: { gender },
        }
      );
      if (response.data.categories) {
        setCategoryArray(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, [gender]);

  return (
    <div className="category-page">
      <h1 className="text-2xl font-bold text-center my-4">
        {gender === "Male"
          ? "Men's Categories"
          : gender === "Female"
          ? "Women's Categories"
          : "Categories"}
      </h1>
      <div className="category-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {categoryArray.length > 0 ? (
          categoryArray.map((element) => (
            <StylingImageText
              key={element._id}
              link={`/product/${gender}/${element._id}`}
              text={element.category}
              img={element.categoryImages}
              alt={`${element.category} image`}
            />
          ))
        ) : (
          <div>Loading categories...</div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
