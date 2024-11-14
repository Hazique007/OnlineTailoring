import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Optionally, you can stop the app from running if the connection fails:
    process.exit(1);
  }
};
