import Product from "../models/productSchema.js";

export const getSpecificProducts = async (req, res) => {
  try {
    const { gender, category, subCategory, fabric, size, color } = req.query;
    let filter = {};
    if (gender) filter.gender = gender;
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (fabric) filter.fabric = fabric;
    if (size) filter.size = size;
    if (color) filter.color = color;

    const products = await Product.find(filter);
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the given criteria." });
    }

    res.status(200).json({
      message: "Successfully fetched products",
      products,
    });
  } catch (error) {
    console.error("Error occurred in getProducts:", error);
    res.status(500).json({ message: "Error in fetching products" });
  }
};

export const getByCategory = async (req, res) => {
  try {
    const { gender, category } = req.query;
    let filter = {};
    if (gender) filter.gender = gender;
    if (category) filter.category = category;

    const products = await Product.find(filter);
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the given criteria." });
    }
    res.status(200).json({
      message: "Successfully fetched products",
      products,
    });
  } catch (error) {
    console.error("Error occurred in getProducts:", error);
    res.status(500).json({ message: "Error in fetching products" });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json({ message: "Got it!! 👌", categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories", error });
  }
};

export const getGenderWiseCategory = async (req, res) => {
  try {
    const { gender } = req.query;

    if (!gender) {
      return res.status(400).json({ message: "Gender is required." });
    }

    const genderWiseCategories = await Product.aggregate([
      { $match: { gender } },
      { $group: { _id: "$category", images: { $push: "$images" } } },
    ]);

    res
      .status(200)
      .json({ message: "Got IT", categories: genderWiseCategories });
  } catch (error) {
    console.error("Error fetching gender-wise categories:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch gender-wise categories", error });
  }
};

export const getAllCategoryWithImages = async (req, res) => {
  try {
    const categoriesWithImages = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          images: { $push: "$images" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          images: 1,
        },
      },
    ]);

    res.status(200).json({ message: "Got it!! 👌", categoriesWithImages });
  } catch (error) {
    console.error("Error fetching categories with images:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch categories with images", error });
  }
};

export const getSubcategory = async (req, res) => {
  const { gender } = req.query;

  if (!gender) {
    return res
      .status(400)
      .json({ message: "Gender query parameter is required." });
  }

  try {
    const getData = await Product.find(
      { gender },
      "category subCategory"
    ).lean();

    if (!getData || getData.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the specified gender." });
    }

    const validatedData = getData.map((item) => ({
      ...item,
      subCategory: Array.isArray(item.subCategory) ? item.subCategory : [],
    }));

    res.status(200).json({
      message: "Subcategories retrieved successfully.",
      getData: validatedData,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({
      message: "An error occurred while fetching subcategories.",
      error: error.message,
    });
  }
};

export const getGenderPlusCategory = async (req, res) => {
  try {
    const { gender, category } = req.query;

    if (!gender || !category) {
      return res.status(400).json({
        success: false,
        message: "Gender and category are required to fetch products.",
      });
    }

    const products = await Product.find({ gender, category });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for the specified gender and category.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products successfully retrieved.",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching products.",
      error: error.message,
    });
  }
};
