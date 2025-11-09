import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

const router = express.Router();

// Get user's conversations (sidebar list)
router.get("/conversations", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const convos = await Conversation.find({ members: userId })
    .sort({ updatedAt: -1 })
    .populate("members", "_id firstName lastName picturePath")
    .lean();
  res.json(convos);
});

// Get messages in a conversation (infinite scroll friendly)
router.get("/messages/:conversationId", verifyToken, async (req, res) => {
  const { conversationId } = req.params;
  const { before } = req.query; // optional ISO date for pagination
  const q = { conversation: conversationId };
  if (before) q.createdAt = { $lt: new Date(before) };
  const msgs = await Message.find(q).sort({ createdAt: -1 }).limit(30).lean();
  res.json(msgs.reverse());
});

// Create or fetch existing 1:1 conversation
router.post("/start", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { peerId } = req.body;

  let convo = await Conversation.findOne({ members: { $all: [userId, peerId], $size: 2 }});
  if (!convo) {
    convo = await Conversation.create({ members: [userId, peerId] });
  }
  res.json(convo);
});

export default router;
