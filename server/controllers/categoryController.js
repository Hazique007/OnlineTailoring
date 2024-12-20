import Category from "../models/categorySchema.js";

export const addCategoryData = async (req, res) => {
  try {
    const { category, gender } = req.body;
    const categoryImages = req.file?.path;
    // console.log(categoryImages);

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
