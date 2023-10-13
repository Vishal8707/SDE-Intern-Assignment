import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

// Define the member schema
const memberSchema = new mongoose.Schema(
  {
    // Community to which the member belongs (reference to "community" model)
    community: {
      type: ObjectId,
      ref: "community", // Reference to the "community" model
      required: true, // Field is required
      trim: true, // Remove leading and trailing spaces
    },
    
    // User who is a member of the community (reference to "user" model)
    user: {
      type: ObjectId,
      ref: "user", // Reference to the "user" model
      required: true, // Field is required
      trim: true, // Remove leading and trailing spaces
    },
    
    // Role of the member in the community (reference to "role" model)
    role: {
      type: ObjectId,
      ref: "role", // Reference to the "role" model
      required: true, // Field is required
      trim: true, // Remove leading and trailing spaces
    },
    
    // Flag to indicate if the member is deleted
    isDeleted: {
      type: Boolean,
      default: false, // Default value is false
    },
  },
  // Add timestamps for created and updated fields
  { timestamps: true }
);

// Create a Mongoose model named "member" using the memberSchema
export default mongoose.model("member", memberSchema);