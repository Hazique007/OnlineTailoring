import mongoose from "mongoose";
require("dotenv").config();

const database = () => {
  mongoose.connect(process.env.URI).then(() => {
    console.log("MongoDB Connected");
  });
};
export default database;
