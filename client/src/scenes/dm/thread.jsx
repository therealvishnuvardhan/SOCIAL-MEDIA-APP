// /client/src/scenes/dm/Thread.jsx
import { useEffect, useRef, useState } from "react";
import { Box, Typography, Avatar, IconButton, InputBase } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useChat } from "../../context/ChatContext.jsx";
import SendIcon from "@mui/icons-material/Send";

export default function Thread() {
  const { conversationId } = useParams();
  const token = useSelector(s => s.token);
  const me = useSelector(s => s.user?._id);
  const { socket, joinConversation, sendMessage, setTyping, typing } = useChat();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (!conversationId || !socket) return;
    joinConversation(conversationId);

    (async () => {
      const res = await fetch(`http://localhost:3001/dm/messages/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(await res.json());
    })();

    const onNew = (msg) => {
      if (msg.conversation === conversationId) setMessages(m => [...m, msg]);
    };
    socket.on("message:new", onNew);
    return () => socket.off("message:new", onNew);
  }, [conversationId, socket, token, joinConversation]);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage({ conversationId, text: trimmed });
    setText("");
    setTyping(conversationId, false);
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }} ref={listRef}>
        {messages.map(m => {
          const mine = m.sender === me;
          return (
            <Box key={m._id} sx={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start", mb: 1 }}>
              <Box sx={{
                maxWidth: "70%",
                p: 1.2,
                borderRadius: 2,
                bgcolor: theme => mine ? theme.palette.primary.main : theme.palette.background.alt,
                color: theme => mine ? theme.palette.background.alt : theme.palette.text.primary,
                boxShadow: 1
              }}>
                {m.mediaUrl && <img src={m.mediaUrl} alt="" style={{ width: "100%", borderRadius: 8, marginBottom: 6 }}/>}
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{m.text}</Typography>
              </Box>
            </Box>
          );
        })}
        {/* typing indicator */}
        {!!Object.values(typing).find(Boolean) && (
          <Typography variant="body2" color="text.secondary">Typing…</Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1.2, borderTop: theme => `1px solid ${theme.palette.neutral.light}` }}>
        <Avatar sx={{ width: 30, height: 30 }} />
        <InputBase
          fullWidth
          placeholder="Message…"
          value={text}
          onChange={e => {
            setText(e.target.value);
            setTyping(conversationId, !!e.target.value);
          }}
          onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
        />
        <IconButton onClick={handleSend}><SendIcon /></IconButton>
      </Box>
    </Box>
  );
}
