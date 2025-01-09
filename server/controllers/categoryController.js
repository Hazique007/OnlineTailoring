import Category from "../models/categorySchema.js";
import Product from "../models/productSchema.js";

export const addCategoryData = async (req, res) => {
  try {
    const { category, gender, categoryDescription } = req.body;
    // console.log(req.body);

    const categoryImages = req.file?.filename;
    console.log(categoryImages);
    console.log(req.file);

    if (!category || !gender || !categoryImages) {
      return res.status(400).json({
        status: "error",
        message: "Category, gender, and categoryImages are required fields",
      });
    }

    const newCategory = new Category({
      category,
      gender,
      categoryImages,
      categoryDescription,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      status: "success",
      message: "Category data added successfully",
      data: savedCategory,
    });
  } catch (error) {
    console.error("Error occurred in adding category data:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while adding category data",
    });
  }
};

export const fetchCategoriesWithImages = async (req, res) => {
  try {
    const { gender } = req.query;

    let categories;
    if (gender) {
      categories = await Category.find({ gender });
    } else {
      categories = await Category.find({});
    }

    if (!categories.length) {
      return res.status(404).json({
        status: "error",
        message: "No categories found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched categories with images",
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories with images:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching categories",
    });
  }
};
export const getGenderWiseCategory = async (req, res) => {
  const { gender } = req.query;

  if (!gender) {
    return res
      .status(400)
      .json({ message: "Gender query parameter is required." });
  }

  try {
    const categories = await Category.find({ gender }).lean();

    if (!categories || categories.length === 0) {
      return res
        .status(404)
        .json({ message: `No categories found for gender: ${gender}.` });
    }

    const data = await Promise.all(
      categories.map(async (category) => {
        const products = await Product.find(
          {
            category: category.category,
          },
          "subCategory gender"
        ).lean();
        return {
          category: category.category,
          products,
        };
      })
    );

    res.status(200).json({
      message: "Categories and products retrieved successfully.",
      data,
    });
  } catch (error) {
    console.error("Error fetching categories and products:", error);
    res.status(500).json({
      message: "An error occurred while fetching data.",
      error: error.message,
    });
  }
};
