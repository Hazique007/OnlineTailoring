import mongoose, { Schema } from "mongoose";

const useSchema = new Schema({
  name: {
    type: [String, "Name must be in String format"],
    required: [true, "name must be added"],
  },
  gender: {
    type: [String, "gender must be in String format"],
    enum: ["Male", "Female"],
    required: [true, "Must Provide your gender for better experiance"],
  },
  role: {
    type: [String, "role must be in String format"],
    enum: ["User", "Admin"],
    required: [true, "Must Provide your role"],
  },
});
