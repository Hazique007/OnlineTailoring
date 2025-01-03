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

export default router;
