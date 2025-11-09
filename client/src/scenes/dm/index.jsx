// /client/src/scenes/dm/index.jsx
import { Box } from "@mui/material";
import ConversationList from "./ConversationList.jsx";
import Thread from "./Thread.jsx";

export default function DMPage() {
  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
      <ConversationList />
      <Thread />
    </Box>
  );
}
