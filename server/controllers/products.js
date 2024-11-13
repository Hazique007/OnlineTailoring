import Product from "../models/productSchema";

export const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find();
    if (products.length === 0) {
      return res.status(400).json({ message: "No Products available" });
    }
    res
      .status(200)
      .json({ message: "Successfully fetched products", products });
  } catch (error) {
    console.log("Error occurred in getAllProducts:", error);
    res.status(400).json({ message: "Error in fetching products" });
  }
};

export const getProductsGenderWise = async (req, res) => {
  try {
    const { gender } = req.params;
    let products = await Product.find({ gender: gender });
    if (products.length === 0) {
      return res
        .status(400)
        .json({ message: "No Products available for this gender" });
    }
    res
      .status(200)
      .json({ message: "Successfully fetched products", products });
  } catch (error) {
    console.log("Error occurred in getProductsGenderWise:", error);
    res.status(400).json({ message: "Error in fetching products" });
  }
};
