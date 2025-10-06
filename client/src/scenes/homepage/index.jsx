// src/scenes/homepage/index.jsx
import { Box, Typography } from "@mui/material";
import Navbar from "scenes/navbar";

const HomePage = () => {
  return (
    <Box>
      <Navbar />
      <Box width="100%" padding="2rem 6%">
        <Typography variant="h4" mb="1rem">
          Welcome to VishnuGram!
        </Typography>
        <Typography variant="body1">
          This is your homepage. Widgets will be added later.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
