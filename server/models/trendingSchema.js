import mongoose from "mongoose";

const trendingSchema = new mongoose.Schema({
  trendingImages: {
    type: [String],
    required: [true, "Trending images are required"],
  },
});

const Trending = mongoose.model("Trending", trendingSchema);
export default Trending;
