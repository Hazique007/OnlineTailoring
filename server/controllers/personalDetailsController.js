import PersonalDetails from "../models/personaldetailsSchema.js";
import multer from "multer";
import path from "path";
// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile-pictures/"); // Folder to save profile pictures
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."));
  }
};

// Multer middleware
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5 MB
});


export const uploadProfilePicture = async (req, res) => {
  try {
    const { userID } = req.body;
    if (!userID) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const profilePicturePath = req.file.path;

    // Update user profile with the picture path
    const user = await PersonalDetails.findOneAndUpdate(
      { userID },
      { profilePicture: profilePicturePath },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile picture uploaded successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ message: "Failed to upload profile picture", error });
  }
};

export const addOrUpdatePersonalDetails = async (req, res) => {
  try {
    const { userID, ...profileData } = req.body;
    const existingDetails = await PersonalDetails.findOne({ userID });

    if (existingDetails) {
      const updatedDetails = await PersonalDetails.findOneAndUpdate(
        { userID },
        profileData,
        { new: true }
      );
      return res.status(200).json(updatedDetails);
    }

    const newDetails = await PersonalDetails.create({ userID, ...profileData });
    res.status(201).json(newDetails);
  } catch (error) {
    res.status(500).json({ message: "Failed to save details", error });
  }
};


export const getPersonalDetails = async (req, res) => {
  try {
    const { userID } = req.query;

    if (!userID) {
      return res.status(400).json({ message: "userID is required" });
    }

    const userDetails = await PersonalDetails.find({ userID });

    if (userDetails.length === 0) {
      return res.status(404).json({ message: "No details found" });
    }

    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error in getPersonalDetails:", error);
    res.status(500).json({ message: "Failed to fetch details", error });
  }
};



// Get all personal details
// export const getPersonalDetails = async (req, res) => {
//   try {
//     const { userID } = req.query;

//     // Validate that userID is provided
//     if (!userID) {
//       return res.status(400).json({ message: "UserID is required to fetch details" });
//     }

//     // Find orders where userID matches
//     const userDetails = await PersonalDetails.find({ userID }); // Use find() to query by userID
//     res.status(200).json(userDetails);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching user details", error });
//   }
// };

// Edit specific personal details
export const editPersonalDetails = async (req, res) => {
  try {
    const { userID } = req.params;
    const updatedFields = req.body;
    const details = await PersonalDetails.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: "Failed to edit details", error });
  }
};

// Update personal details (Full Update)
export const updatePersonalDetails = async (req, res) => {
  try {
    const { userID } = req.params; // Extract the userID from params (or body if preferred)
    const { name, mobileNumber, gender, age, emailAddress, profilePicture } = req.body;

    // Validate input
    if (!name || !mobileNumber || !gender || !age || !emailAddress ||  profilePicture) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find and update the personal details by userID
    const updatedDetails = await PersonalDetails.findOneAndUpdate(
      { userID },  // Find the document by userID
      { name, mobileNumber, gender, age, emailAddress, profilePicture },  // Update these fields
      { new: true, runValidators: true }  // Return the updated document and run validation
    );

    if (!updatedDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: 'Personal details updated successfully',
      data: updatedDetails,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// // Delete personal details
// export const deletePersonalDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await PersonalDetails.findByIdAndDelete(id);
//     res.status(200).json({ message: "Details deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete details", error });
//   }
// };
