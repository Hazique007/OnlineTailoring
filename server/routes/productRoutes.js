import express from "express";
import {
  // getAllProducts,
  // getProductsGenderWise,
  getSpecificProducts,
  // getProductsGenderandCategoryWise,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/allProducts", getSpecificProducts);

// router.get("/allProducts/:gender/:category", getSpecificProducts);

// router.get("/getSpecificProducts", getSpecificProducts);

export default router;
