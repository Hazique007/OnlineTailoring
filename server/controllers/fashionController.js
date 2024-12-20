import Fashion from "../models/fashionSchema.js";

export const addFashionImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No images uploaded. Please upload at least one image.",
      });
    }

    const fashionImages = req.files.map((file) => file.filename);

    if (fashionImages.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No valid images uploaded. Please upload valid image files.",
      });
    }

    const newFashion = new Fashion({
      fashionImages,
    });

    const savedFashion = await newFashion.save();

    res.status(201).json({
      status: "success",
      message: "Fashion page images added successfully",
      savedFashion,
    });
  } catch (error) {
    console.error("Error adding Fashion page images:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: `Validation error: ${error.message}`,
      });
    }

    res.status(500).json({
      status: "error",
      message:
        "Server error while adding Fashion page images. Please try again later.",
    });
  }
};

export const getFashionPageImages = async (req, res) => {
  try {
    const fashionData = await Fashion.find({});

    if (!fashionData.length) {
      return res.status(404).json({
        status: "error",
        message: "No fashion page data found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched fashion page images",
      data: fashionData,
    });
  } catch (error) {
    console.error("Error fetching Fashion page images:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching fashion page images",
    });
  }
};
