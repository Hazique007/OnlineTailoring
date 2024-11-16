import Category from "../models/categorySchema";

export const getCategoryData = async (req, res) => {
  try {
    const data = await Category.find({});
    if (!data || data.length === 0) {
      return res.status(404).json({ status: "error", message: "No Category Data found" });
    }
    res.status(200).json({ status: "success", message: "Got Category Data", data });
  } catch (error) {
    console.error("Error occurred in getting Category Data:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

export const addCategoryData = async (req, res) => {
  try {
    const { category, gender, subCategory, images, stock } = req.body;

    if (!category || !gender || !subCategory || !images || !stock) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    const newCategory = new Category({
      category,
      gender,
      subCategory,
      images,
      stock,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      status: "success",
      message: "Category Data added successfully",
      data: savedCategory,
    });
  } catch (error) {
    console.error("Error occurred in adding Category Data:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};
