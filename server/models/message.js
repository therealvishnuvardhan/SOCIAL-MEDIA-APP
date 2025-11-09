import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", index: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, default: "" },
  mediaUrl: String,      // optional: image/video
  seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // read receipts
}, { timestamps: true });

MessageSchema.index({ conversation: 1, createdAt: 1 });
export default mongoose.model("Message", MessageSchema);
