import Landing from "../models/landingSchema.js";

export const getLandingImages = async (req, res) => {
  try {
    const data = await Landing.findOne();
    if (!data) {
      return res
        .status(404)
        .json({ status: "error", message: "No landing images found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Got landing images", data });
  } catch (error) {
    console.error("Error fetching landing images:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

export const uploadLandingImages = async (req, res) => {
  try {
    const { bannerImages, trendingImages, fashionStyleImages } = req.body;

    const updatedLanding = await Landing.findOneAndUpdate(
      {},
      { bannerImages, trendingImages, fashionStyleImages },
      { new: true, upsert: true }
    );

    res.status(200).json({
      status: "success",
      message: "Landing images uploaded successfully",
      data: updatedLanding,
    });
  } catch (error) {
    console.error("Error updating landing images:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};
