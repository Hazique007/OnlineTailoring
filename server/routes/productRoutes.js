import express from "express";
import {
  // getAllProducts,
  // getProductsGenderWise,
  getSpecificProducts,
  getAllCategory,
  getAllCategoryWithImages,
  getGenderWiseCategory,
  getSubcategory,
  getGenderPlusCategory,
  GenderCategorySubcategory,
  UpdateGenderCategorySubcategory,
  CategorySubcategoryDelete,
  GenderCategory,
  UpdateGenderCategory,
  CategoryDelete,
  // getProductsGenderandCategoryWise,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/allProducts", getSpecificProducts);
router.get("/getAllCategory", getAllCategory);
router.get("/getAllCategoryWithImages", getAllCategoryWithImages);
router.get("/getGenderWiseCategory", getGenderWiseCategory);
router.get("/getSubcategory", getSubcategory);
router.get("/getGenderPlusCategory", getGenderPlusCategory);
router.get("/GenderCategorySubcategory", GenderCategorySubcategory);
router.put("/UpdateGenderCategorySubcategory", UpdateGenderCategorySubcategory);
router.delete("/CategorySubcategoryDelete", CategorySubcategoryDelete);
router.get("/GenderCategory", GenderCategory);
router.put("/UpdateGenderCategory", UpdateGenderCategory);
router.delete("/CategoryDelete", CategoryDelete);

export default router;
