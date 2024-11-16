import {
  getLandingImages,
  uploadLandingImages,
} from "../controllers/landingController.js";
import express from "express";
const router = express.Router();

router.get("/getLandingImages", getLandingImages);
router.put("/updateLandingImages", uploadLandingImages);

export default router;
