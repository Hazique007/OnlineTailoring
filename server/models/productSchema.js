import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  category: {
    type: String,
    enum: ["Shirts", "Pants", "Blazers", "Suits", "Kurta"],
    required: [true, "Category is required"],
  },
  subCategory: {
    type: [String],
    required: function () {
      return ["Shirts", "Pants", "Blazers", "Suits", "Kurta"].includes(
        this.category
      );
    },
    enum: ["Casual", "Formal", "Party Wear", "Traditional", "Ethnic"],
  },
  gender: {
    type: [String, "gender must be in String format"],
    enum: ["Men", "Women", "General"],
    required: [true, "Must Provide your gender for better experiance"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive value"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  fabric: {
    type: String,
    required: [true, "Fabric type is required"],
  },
  sizes: {
    type: [String],
    enum: ["XS", "S", "M", "L", "XL", "XXL"],
    required: [true, "Available sizes must be specified"],
  },
  colors: {
    type: [String],
    required: [true, "Available colors must be specified"],
  },
  isCustomized: {
    type: Boolean,
    default: false,
  },
  customizationOptions: {
    type: String,
    required: function () {
      return this.isCustomized;
    },
  },
  images: {
    type: [String],
    required: [true, "Product images are required"],
  },
  stock: {
    type: Number,
    required: [true, "Stock quantity is required"],
    min: [0, "Stock cannot be negative"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
