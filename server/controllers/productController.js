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
