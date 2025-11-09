// /client/src/context/ChatContext.jsx
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { makeSocket } from "../socket";
import { useSelector } from "react-redux";

const ChatCtx = createContext();
export const useChat = () => useContext(ChatCtx);

export default function ChatProvider({ children }) {
  const token = useSelector(s => s.token);
  const socketRef = useRef(null);
  const [typing, setTyping] = useState({});
  const [online, setOnline] = useState(new Set());

  useEffect(() => {
    if (!token) return;
    const socket = makeSocket(token);
    socket.connect();
    socketRef.current = socket;

    socket.on("presence:online", ({ userId }) => setOnline(s => new Set([...s, userId])));
    socket.on("presence:offline", ({ userId }) => setOnline(s => { const n = new Set(s); n.delete(userId); return n; }));
    socket.on("message:typing", ({ userId, isTyping }) => setTyping(t => ({ ...t, [userId]: isTyping })));

    return () => socket.disconnect();
  }, [token]);

  const api = useMemo(() => ({
    socket: socketRef.current,
    joinConversation: (id) => socketRef.current?.emit("conversation:join", { conversationId: id }),
    sendMessage: (payload) => socketRef.current?.emit("message:send", payload),
    setTyping: (conversationId, isTyping) => socketRef.current?.emit("message:typing", { conversationId, isTyping }),
    markSeen: (conversationId, ids) => socketRef.current?.emit("message:seen", { conversationId, messageIds: ids }),
    online,
    typing
  }), [online, typing]);

  return <ChatCtx.Provider value={api}>{children}</ChatCtx.Provider>;
}
