import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    owner: {
      type: ObjectId,
      ref:"user",
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("community", userSchema);


