import mongoose from "mongoose";

const landingSchema = new mongoose.Schema({
  bannerImages: {
    type: [String],
    required: [true],
  },
  trendingImages: {
    type: [String],
    required: [true],
  },
  fashionStyleImages: {
    type: [String],
    required: [true],
  },
});

const Landing = mongoose.model("Landing", landingSchema);
export default Landing;
