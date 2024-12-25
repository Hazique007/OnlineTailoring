import Address from '../models/addresschema.js';

// Add a new address
export const addAddress = async (req, res) => {
  try {
    const { name, address1, address2, pincode } = req.body;

    // Validate input
    if (!name || !address1 || !address2 || !pincode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save to database
    const newAddress = new Address({ name, address1, address2, pincode });
    await newAddress.save();

    res.status(201).json({ message: 'Address added successfully', data: newAddress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch all addresses
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json({ data: addresses });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Edit an existing address
export const editAddress = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedAddress = await Address.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address updated successfully", data: updatedAddress });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Error updating address" });
  }
};

// Update an existing address
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address1, address2, pincode } = req.body;

    // Validate input
    if (!name || !address1 || !address2 || !pincode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find and update the address
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { name, address1, address2, pincode },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ message: 'Address updated successfully', data: updatedAddress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the address
    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ message: 'Address deleted successfully', data: deletedAddress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
