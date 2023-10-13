import mongoose from "mongoose";

// Define the role schema
const roleSchema = new mongoose.Schema(
  {
    // Role name
    name: {
      type: String,
      required: true, // Field is required
      unique: true, // Role names should be unique
      lowercase: true, // Store the role name in lowercase
      trim: true, // Remove leading and trailing spaces
    },
  },
  // Add timestamps for created and updated fields
  { timestamps: true }
);

// Create a Mongoose model named "role" using the roleSchema
export default mongoose.model("role", roleSchema);