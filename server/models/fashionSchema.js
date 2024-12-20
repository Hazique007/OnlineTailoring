import mongoose from "mongoose";

const fashionSchema = new mongoose.Schema({
  fashionImages: {
    type: [String],
    required: [true, "Fashion images are required"],
  },
});

const Fashion = mongoose.model("Fashion", fashionSchema);
export default Fashion;
