// /client/src/scenes/dm/ConversationList.jsx
import { useEffect, useState } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ConversationList() {
  const token = useSelector(s => s.token);
  const [convos, setConvos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3001/dm/conversations", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConvos(await res.json());
    })();
  }, [token]);

  return (
    <Box sx={{ width: 360, borderRight: theme => `1px solid ${theme.palette.neutral.light}`, overflowY: "auto" }}>
      {convos.map(c => {
        const peer = c.members[0]; // if backend returns peer first for current user; else find the one != me
        const label = `${peer.firstName} ${peer.lastName}`;
        return (
          <Box key={c._id}
            onClick={() => navigate(`/dm/${c._id}`)}
            sx={{ display: "flex", gap: 1.5, alignItems: "center", p: 1.2, cursor: "pointer",
              "&:hover": { backgroundColor: theme => theme.palette.background.alt }}}>
            <Avatar src={`http://localhost:3001/assets/${peer.picturePath}`} />
            <Box overflow="hidden">
              <Typography noWrap fontWeight={600}>{label}</Typography>
              <Typography noWrap variant="body2" color="text.secondary">
                {c.lastMessage?.text || "Start chatting"}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
