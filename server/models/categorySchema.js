import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "General"],
  },
  subCategory: {
    type: [String],
  },
  categoryImages: {
    type: String,
  },
  SubCategoryimages: {
    type: [String, "Images must be string"],
  },
  stock: {
    type: [Number, "Stock must be a number"],
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
