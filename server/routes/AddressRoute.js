import express from 'express';
import { 
  addAddress, 
  getAddresses, 
  updateAddress, 
  deleteAddress,
  editAddress
} from'../controllers/addresscontroller.js';
const router = express.Router();

// Route to add a new address
router.post('/add', addAddress);

// Route to get all addresses
router.get('/list', getAddresses);

// Edit address route
router.put("/edit/:id", editAddress);

// Route to update an address
router.put('/update/:id', updateAddress);

// Route to delete an address
router.delete('/delete/:id', deleteAddress);

export default router;
