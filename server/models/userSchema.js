import mongoose, { Schema } from "mongoose";

const useSchema = new Schema({
  name: {
    type: [String, "Name must be in String format"],
    required: [true, "name must be added"],
  },
  gender: {
    type: [String, "gender must be in String format"],
    enum: ["Men", "FeMen"],
    required: [true, "Must Provide your gender for better experiance"],
  },
  role: {
    type: [String, "role must be in String format"],
    enum: ["User", "Admin"],
    required: [true, "Must Provide your role"],
  },
});
