import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", index: true }],
  lastMessage: {
    text: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: Date,
  }
}, { timestamps: true });

ConversationSchema.index({ members: 1 });
export default mongoose.model("Conversation", ConversationSchema);
