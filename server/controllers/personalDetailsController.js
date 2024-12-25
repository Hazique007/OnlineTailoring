const PersonalDetails = require("../models/personaldetailsSchema");

// Add new personal details
exports.addPersonalDetails = async (req, res) => {
  try {
    const newDetails = new PersonalDetails(req.body);
    await newDetails.save();
    res.status(201).json(newDetails);
  } catch (error) {
    res.status(500).json({ message: "Failed to add details", error });
  }
};

// Get all personal details
exports.getPersonalDetails = async (req, res) => {
  try {
    const details = await PersonalDetails.find();
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch details", error });
  }
};

// Edit specific personal details
exports.editPersonalDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    const details = await PersonalDetails.findByIdAndUpdate(id, updatedFields, { new: true });
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: "Failed to edit details", error });
  }
};

// Update personal details (Full Update)
exports.updatePersonalDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDetails = req.body;
    const details = await PersonalDetails.findByIdAndUpdate(id, updatedDetails, { new: true });
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: "Failed to update details", error });
  }
};

// Delete personal details
exports.deletePersonalDetails = async (req, res) => {
  try {
    const { id } = req.params;
    await PersonalDetails.findByIdAndDelete(id);
    res.status(200).json({ message: "Details deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete details", error });
  }
};
