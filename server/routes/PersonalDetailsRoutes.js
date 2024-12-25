import express from 'express'
const { 
  addPersonalDetails, 
  getPersonalDetails, 
  updatePersonalDetails, 
  deletePersonalDetails, 
  editPersonalDetails 
} = require("../controllers/personalDetailsController");

const router = express.Router();

// Route to add new personal details
router.post("/addpersonal", addPersonalDetails);

// Route to get personal details
router.get("/listpersonal", getPersonalDetails);

// Route to edit specific personal details
router.put("/:id", editPersonalDetails);

// Route to update personal details
router.put("/:id", updatePersonalDetails);

// Route to delete personal details
router.delete("/delete/:id", deletePersonalDetails);

export default router