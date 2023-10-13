import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    // User's name
    name: {
      type: String,
      required: true, // Field is required
      lowercase: true, // Store the name in lowercase
      trim: true, // Remove leading and trailing spaces
    },
    
    // User's email address
    email: {
      type: String,
      required: true, // Field is required
      unique: true, // Email addresses should be unique
      trim: true, // Remove leading and trailing spaces
    },
    
    // User's password
    password: {
      type: String,
      required: true, // Field is required
      minLen: 8, // Minimum length of 8 characters
      maxLen: 15, // Maximum length of 15 characters
      trim: true, // Remove leading and trailing spaces
    }
  },
  // Add timestamps for created and updated fields
  { timestamps: true }
);

// Create a Mongoose model named "user" using the userSchema
export default mongoose.model("user", userSchema);