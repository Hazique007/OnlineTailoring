import Product from "../models/productSchema.js";
import Category from "../models/categorySchema.js";

export const getSpecificProducts = async (req, res) => {
  try {
    const { gender, category, subCategory, fabric, size, color } = req.query;

    // Build the filter object dynamically based on query parameters
    const filter = {};
    if (gender) filter.gender = gender;
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (fabric) filter.fabric = fabric;
    if (size) filter.size = size;
    if (color) filter.color = color;

    // Sort by price in increasing order by default
    const sort = { price: 1 };

    // Query the database with the constructed filter and default sort
    const products = await Product.find(filter).sort(sort);

    // Check if products exist for the given criteria
    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found for the given criteria.",
      });
    }

    // Return the fetched products
    return res.status(200).json({
      message: "Successfully fetched products.",
      products,
    });
  } catch (error) {
    console.error("Error occurred in getSpecificProducts:", error.message);

    // Return error response
    return res.status(500).json({
      message: "An error occurred while fetching products.",
      error: error.message,
    });
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
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const categoriesWithImages = await Product.find(
      { category },
      { subCategory: 1, _id: 0 }
    );

    res.status(200).json({
      message: "Got it!! 👌",
      categoriesWithImages,
    });
  } catch (error) {
    console.error("Error fetching categories with images:", error);
    res.status(500).json({
      message: "Failed to fetch categories with images",
      error,
    });
  }
};

export const getSubcategory = async (req, res) => {
  const { gender, category } = req.query;

  if (!gender) {
    return res.status(400).json({
      message: "Gender query parameter is required.",
    });
  }

  try {
    const query = { gender };
    if (category) {
      query.category = category;
    }

    const data = await Product.find(query, {
      subCategory: 1,
      _id: 0,
      gender,
    }).lean();

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "No subcategories found for the specified query.",
      });
    }

    const subCategories = data.map((item) => item.subCategory);

    res.status(200).json({
      message: "Subcategories retrieved successfully.",
      subCategories,
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

export const getFabricGenderPlusCategory = async (req, res) => {
  const { gender, category } = req.query;

  if (!gender || !category) {
    return res.status(400).json({
      message: "Both gender and category query parameters are required.",
    });
  }

  try {
    const products = await Product.find({ gender, category }).lean();

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: `No products found for gender: ${gender} and category: ${category}.`,
      });
    }

    const fabrics = [...new Set(products.map((product) => product))];

    res.status(200).json({
      message: "Fabrics retrieved successfully.",
      data: fabrics,
    });
  } catch (error) {
    console.error("Error fetching fabrics:", error);
    res.status(500).json({
      message: "An error occurred while fetching fabrics.",
      error: error.message,
    });
  }
};

export const GenderCategorySubcategory = async (req, res) => {
  const { gender, category, subCategory } = req.query;
  if (!gender || !category || !subCategory) {
    return res
      .status(400)
      .json({ message: "All three parameters are required" });
  }

  const products = await Product.find({
    gender: gender,
    category: category,
    subCategory: subCategory,
  });
  if (products.length === 0) {
    return res
      .status(404)
      .json({ message: "No products found for the given criteria." });
  }
  res.status(200).json({ message: "Successfully fetched products", products });
};

export const UpdateGenderCategorySubcategory = async (req, res) => {
  const { gender, category, subCategory } = req.query;

  if (!gender || !category || !subCategory) {
    return res.status(400).json({
      message:
        "All three parameters (gender, category, subCategory) are required",
    });
  }

  const validGenders = ["Male", "Female", "General"];
  if (!validGenders.includes(gender)) {
    return res.status(400).json({
      message:
        "Invalid gender value. It must be one of the following: Male, Female, General",
    });
  }

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { gender, category, subCategory },
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message:
          "No product found with the given gender, category, and subCategory",
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the product" });
  }
};

export const CategorySubcategoryDelete = async (req, res) => {
  const { gender, category, subCategory } = req.query;
  if (!gender || !category || !subCategory) {
    return res
      .status(400)
      .json({ message: "All three parameters are required" });
  }
  try {
    const deletedProduct = await Product.findOneAndDelete({
      gender: gender,
      category: category,
      subCategory: subCategory,
    });
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "No product found for the given criteria" });
    } else {
      return res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the product" });
  }
};
///GenderCategory
export const GenderCategory = async (req, res) => {
  const { gender, category } = req.query;
  if (!gender || !category) {
    return res.status(400).json({ message: "All parameters are required" });
  }

  const products = await Category.find({
    gender: gender,
    category: category,
  });
  if (products.length === 0) {
    return res
      .status(404)
      .json({ message: "No products found for the given criteria." });
  }
  res.status(200).json({ message: "Successfully fetched products", products });
};

//

export const UpdateGenderCategory = async (req, res) => {
  const { gender, category } = req.query;

  if (!gender || !category) {
    return res.status(400).json({
      message: "All  parameters (gender, category) are required",
    });
  }

  const validGenders = ["Male", "Female", "General"];
  if (!validGenders.includes(gender)) {
    return res.status(400).json({
      message:
        "Invalid gender value. It must be one of the following: Male, Female, General",
    });
  }

  try {
    const updatedProduct = await Category.findOneAndUpdate(
      { gender, category },
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message:
          "No product found with the given gender, category, and subCategory",
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the product" });
  }
};
///
export const CategoryDelete = async (req, res) => {
  const { gender, category } = req.query;
  if (!gender || !category) {
    return res.status(400).json({ message: "All  parameters are required" });
  }
  try {
    const deletedProduct = await Category.findOneAndDelete({
      gender: gender,
      category: category,
    });
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "No product found for the given criteria" });
    } else {
      return res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the product" });
  }
};

export const addSubCategory = async (req, res) => {
  try {
    const {
      category,
      subCategory,
      // images,
      price,
      gender,
      description,
      stock,
      highlight,
    } = req.body;
    // console.log(req.body);
    // console.log(req.files);
    const images = req.files.map(file => file.filename);
    console.log(req.body);

    // Validation
    // if (!category || !subCategory || !images || !description || !gender) {
    //   return res.status(400).json({ message: "All the fields are required" });
    // }

    // Create a new product instance
    const newProduct = new Product({
      category,
      subCategory,
      stock,
      price,
      highlight,
      images,
      gender,
      description,
    });

    // Save the product
    const savedProduct = await newProduct.save();
    return res.status(201).json({
      message: "Subcategory added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
