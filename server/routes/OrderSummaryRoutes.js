import express from "express";
import {
  createOrderSummary,
  getOrderSummaryByUser,
  updateStitchingCharges,
} from "../controllers/ordersummarycontroller";

const router = express.Router();

// Create a new order summary
router.post("/", createOrderSummary);

// Get order summary by user ID
router.get("/:userId", getOrderSummaryByUser);

// Update stitching charges
router.put("/:userId", updateStitchingCharges);

export default router;
