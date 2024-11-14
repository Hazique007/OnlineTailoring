import express from "express";
import {
  getAllProducts,
  getProductsGenderWise,
  getSpecificProducts,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/allProducts", getAllProducts);
router.get("/allProducts/:gender", getProductsGenderWise);
router.get("/getSpecificProducts", getSpecificProducts);

export default router;
