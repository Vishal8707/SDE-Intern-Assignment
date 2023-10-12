import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema(
  {
    community: {
        type: ObjectId,
        ref:"community",
        required: true,
        trim: true,
      },
      user: {
        type: ObjectId,
        ref:"user",
        required: true,
        trim: true,
      },
      role: {
        type: ObjectId,
        ref:"role",
        required: true,
        trim: true,
      },
  },
  { timestamps: true }
);

export default  mongoose.model("member", userSchema);

