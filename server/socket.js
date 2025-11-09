import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Conversation from "./models/conversation.js";
import Message from "./models/message.js";

const onlineUsers = new Map(); // userId -> socketId(s)

export function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: ["http://localhost:3000"], credentials: true }
  });

  io.use((socket, next) => {
    // Auth with JWT from query or headers
    const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(" ")[1];
    if (!token) return next(new Error("no token"));
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = { id: payload.id };
      next();
    } catch {
      next(new Error("bad token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.user.id;

    // Track online presence
    if (!onlineUsers.has(userId)) onlineUsers.set(userId, new Set());
    onlineUsers.get(userId).add(socket.id);
    io.emit("presence:online", { userId });

    socket.on("conversation:join", async ({ conversationId }) => {
      socket.join(conversationId);
    });

    socket.on("message:typing", ({ conversationId, isTyping }) => {
      socket.to(conversationId).emit("message:typing", { userId, isTyping });
    });

    socket.on("message:send", async ({ conversationId, text, mediaUrl }) => {
      // persist
      const msg = await Message.create({
        conversation: conversationId,
        sender: userId,
        text: text?.trim() || "",
        mediaUrl
      });
      // update conversation
      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: { text: msg.text || "📎 Media", sender: userId, createdAt: msg.createdAt }
      }, { new: true });

      // emit to room
      io.to(conversationId).emit("message:new", msg);
    });

    socket.on("message:seen", async ({ conversationId, messageIds }) => {
      await Message.updateMany(
        { _id: { $in: messageIds } },
        { $addToSet: { seenBy: userId } }
      );
      socket.to(conversationId).emit("message:seen", { userId, messageIds });
    });

    socket.on("disconnect", () => {
      const set = onlineUsers.get(userId);
      if (set) {
        set.delete(socket.id);
        if (set.size === 0) {
          onlineUsers.delete(userId);
          io.emit("presence:offline", { userId });
        }
      }
    });
  });

  return io;
}
