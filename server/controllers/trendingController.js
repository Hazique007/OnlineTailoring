import Trending from "../models/trendingSchema.js";

export const addTrendingImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No images uploaded. Please upload at least one image.",
      });
    }

    const trendingImages = req.files.map((file) => file.filename);

    if (trendingImages.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No valid images uploaded. Please upload valid image files.",
      });
    }

    const newTrending = new Trending({
      trendingImages,
    });

    const savedTrending = await newTrending.save();

    res.status(201).json({
      status: "success",
      message: "Trending page images added successfully",
      savedTrending,
    });
  } catch (error) {
    console.error("Error adding Trending page images:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: `Validation error: ${error.message}`,
      });
    }

    res.status(500).json({
      status: "error",
      message:
        "Server error while adding Trending page images. Please try again later.",
    });
  }
};

export const getTrendingPageImages = async (req, res) => {
  try {
    const trendingData = await Trending.find({});

    if (!trendingData.length) {
      return res.status(404).json({
        status: "error",
        message: "No Trending page data found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully fetched Trending page images",
      data: trendingData,
    });
  } catch (error) {
    console.error("Error fetching Trending page images:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while fetching Trending page images",
    });
  }
};
