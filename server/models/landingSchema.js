import mongoose from "mongoose";

const landingSchema = new mongoose.Schema({
  bannerImages: {
    type: [String],
    required: [true, "Banner images are required"],
  },
});

const Landing = mongoose.model("Landing", landingSchema);
export default Landing;
