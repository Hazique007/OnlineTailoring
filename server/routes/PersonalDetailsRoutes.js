import express from "express";
import {
  addPersonalDetails,
  getPersonalDetails,
  updatePersonalDetails,
  deletePersonalDetails,
  editPersonalDetails,
} from "../controllers/personalDetailsController.js";

const router = express.Router();

router.post("/addpersonal", addPersonalDetails);

router.get("/listpersonal", getPersonalDetails);

router.put("/:id", editPersonalDetails);

router.put("/:id", updatePersonalDetails);

router.delete("/delete/:id", deletePersonalDetails);

export default router;
