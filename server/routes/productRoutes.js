import express from "express";
import { getAllProducts } from "../controllers/products";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World").status(200);
});

router.get("/allProducts", getAllProducts);

