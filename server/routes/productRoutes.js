import express from "express";
import {
  // getAllProducts,
  // getProductsGenderWise,
  getSpecificProducts,
  getAllCategory,
  getAllCategoryWithImages,
  getGenderWiseCategory,
  // getProductsGenderandCategoryWise,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/allProducts", getSpecificProducts);
router.get("/getAllCategory", getAllCategory);
router.get("/getAllCategoryWithImages", getAllCategoryWithImages);
router.get("/getGenderWiseCategory", getGenderWiseCategory);

export default router;
