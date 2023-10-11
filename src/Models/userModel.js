import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLen: 8,
      maxLen: 15,
      trim: true,
    }
  },
  { timestamps: true }
);

export default  mongoose.model("user", userSchema);