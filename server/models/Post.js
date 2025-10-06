import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: { type: Map, of: Boolean },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

// ✅ Fix: only create model if it doesn't already exist
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
