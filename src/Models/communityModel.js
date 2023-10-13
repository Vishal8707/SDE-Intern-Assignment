import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

// Define the community schema
const communitySchema = new mongoose.Schema(
  {
    // Name of the community
    name: {
      type: String,
      required: true, // Field is required
      lowercase: true, // Store the name in lowercase
      trim: true, // Remove leading and trailing spaces
    },

    // Unique slug for the community
    slug: {
      type: String,
      required: true, // Field is required
      unique: true, // Slugs should be unique
      lowercase: true, // Store the slug in lowercase
      trim: true, // Remove leading and trailing spaces
    },

    // Owner of the community (reference to the "user" model)
    owner: {
      type: ObjectId,
      ref: "user", // Reference to the "user" model
      required: true, // Field is required
      trim: true, // Remove leading and trailing spaces
    },
  },
  // Add timestamps for created and updated fields
  { timestamps: true }
);

// Create a Mongoose model named "community" using the communitySchema
export default mongoose.model("community", communitySchema);