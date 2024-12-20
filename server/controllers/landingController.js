import { error } from "console";
import Landing from "../models/landingSchema.js";


export const addLandingPageImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No banner images uploaded. Please upload at least one image.",
      });
    }

    const bannerImages = req.files.map((file) => file.filename);

    if (bannerImages.length === 0) {
      return res.status(400).json({
        status: "error",
        message:
          "Failed to add landing page images. Please upload valid images.",
      });
    }

    const newLanding = new Landing({
      bannerImages,
    });

    const savedLanding = await newLanding.save();

    res.status(201).json({
      status: "success",
      message: "Landing page images added successfully",
      data: savedLanding,
    });
  } catch (error) {
    console.error("Error adding landing page images:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: `Validation error: ${error.message}`,
      });
    }

    res.status(500).json({
      status: "error",
      message:
        "Server error while adding landing page images. Please try again later.",
    });
  }
};

export const getLandingPageImages = async (req, res) => {
  try {
    const landingData = await Landing.find({});

    if (!landingData.length) {
      return res.status(404).json({
        status: "error",
        message: "No landing page data found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched landing page images",
      data: landingData,
    });
  } catch (error) {
    console.error("Error fetching landing page images:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching landing page images",
    });
  }
};

export const updateLandingPageImages = async (req, res) => {
  try {
    const { bannerImages, trendingImages, fashionStylingImages } = req.body;
    const updatedData = await Landing.findOneAndUpdate(
      {},
      {
        bannerImages,

        trendingImages,
        fashionStylingImages,
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({
        status: "error",
        message: "No landing page data found to update",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Landing page images updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating landing page images:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while updating landing page images",
    });
  }
};
