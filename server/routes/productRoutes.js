import express from "express";
import {
  getAllProducts,
  getProductsGenderWise,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/allProducts", getAllProducts);
router.get("/allProducts/:gender", getProductsGenderWise);

export default router;
