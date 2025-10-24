import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import "./Loginpage.css";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box className="login-container">
      {/* Left side image section */}
      {isNonMobileScreens && (
        <Box className="login-left">
          <div className="login-image-overlay"></div>
          
          
        </Box>
      )}

      {/* Right side form section */}
      <Box className="login-right">
        <Box
          className="login-box"
          sx={{
            backgroundColor: "rgba(0,0,0,0.6)",
            boxShadow: "0 4px 25px rgba(0,224,255,0.3)",
            backdropFilter: "blur(8px)",
            borderRadius: "1.5rem",
          }}
        >
          <Typography
            fontWeight="bold"
            fontSize="38px"
            textAlign="center"
            color={theme.palette.primary.main}
            sx={{
              mb: "1rem",
              textShadow: "0 0 20px #00e0ff",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            SPHERE
          </Typography>
          <Typography
            fontSize="16px"
            textAlign="center"
            sx={{
              mb: "1.5rem",
              color: theme.palette.neutral.light,
              fontStyle: "italic",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Welcome back — connect to your world
          </Typography>

          <Form />

          {/* Divider and bottom text */}
          <Typography
            textAlign="center"
            sx={{
              color: theme.palette.neutral.light,
              mt: "1rem",
              fontSize: "14px",
            }}
          >
            Don’t have an account? <span className="signup-link">Sign up</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
