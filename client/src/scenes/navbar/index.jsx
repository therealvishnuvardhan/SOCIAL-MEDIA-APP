import {
  DarkMode,
  LightMode,
  Search,
  InfoOutlined,
  Menu as MenuIcon,
  Close,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  Popover,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import axios from "axios";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;
  const primaryLight = theme.palette.primary.light;

  // 🔍 Handle search bar
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3001/users/search?q=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchResults(res.data);
    } catch (err) {
      console.log("Search error:", err);
    }
  };

  // ℹ️ About Sphere popup
  const handleAboutClick = (event) => setAnchorEl(event.currentTarget);
  const handleAboutClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="100"
      backgroundColor={alt}
      sx={{
        boxShadow: "0px 4px 20px rgba(0,0,0,0.25)",
        borderBottom: `1px solid ${neutralLight}`,
        backdropFilter: "blur(8px)",
      }}
    >
      <FlexBetween padding="1rem 6%">
        {/* LEFT SECTION */}
        <FlexBetween gap="2rem">
          {/* 🌌 Brand Logo */}
          <Typography
            fontWeight="bold"
            fontSize="1.8rem"
            onClick={() => navigate("/home")}
            sx={{
              cursor: "pointer",
              transition: "0.3s ease",
              color:
                theme.palette.mode === "dark"
                  ? "#a855f7" // purple in dark
                  : theme.palette.primary.main,
              textShadow:
                theme.palette.mode === "dark"
                  ? "0 0 15px #a855f7"
                  : "0 0 15px #1E1E1E",
              "&:hover": {
                transform: "scale(1.05)",
                textShadow:
                  theme.palette.mode === "dark"
                    ? "0 0 25px #c084fc"
                    : "0 0 25px #1E1E1E",
              },
            }}
          >
            Sphere
          </Typography>

          {/* 🔍 Search Bar */}
          {isNonMobileScreens && (
            <Box
              position="relative"
              display="flex"
              alignItems="center"
              backgroundColor={neutralLight}
              borderRadius="2rem"
              padding="0.4rem 1rem"
              sx={{
                transition: "0.3s",
                "&:focus-within": {
                  boxShadow: "0 0 12px rgba(255, 0, 128, 0.7)",
                },
              }}
            >
              <InputBase
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearch}
                sx={{ width: "14rem", color: theme.palette.neutral.dark }}
              />
              <IconButton>
                <Search />
              </IconButton>

              {/* ✅ Search Dropdown */}
              {searchResults.length > 0 && (
                <Box
                  position="absolute"
                  top="105%"
                  left="0"
                  width="100%"
                  backgroundColor={background}
                  borderRadius="0.5rem"
                  boxShadow="0 4px 15px rgba(0,0,0,0.4)"
                  zIndex="200"
                  maxHeight="250px"
                  overflow="auto"
                >
                  {searchResults.map((u) => (
                    <FlexBetween
                      key={u._id}
                      onClick={() => {
                        navigate(`/profile/${u._id}`);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      sx={{
                        padding: "0.6rem 1rem",
                        cursor: "pointer",
                        "&:hover": { backgroundColor: neutralLight },
                      }}
                    >
                      <FlexBetween gap="1rem">
                        <Avatar
                          src={`http://localhost:3001/assets/${u.picturePath}`}
                          alt={`${u.firstName}`}
                          sx={{ width: 35, height: 35 }}
                        />
                        <Typography fontWeight="500" color={theme.palette.neutral.dark}>
                          {u.firstName} {u.lastName}
                        </Typography>
                      </FlexBetween>
                    </FlexBetween>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </FlexBetween>

        {/* RIGHT SECTION */}
        {isNonMobileScreens ? (
          <FlexBetween gap="1.5rem">
            {/* 🌗 Theme Toggle */}
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <LightMode sx={{ color: "#fff", fontSize: "28px" }} />
              ) : (
                <DarkMode sx={{ color: "#000", fontSize: "28px" }} />
              )}
            </IconButton>

            {/* ℹ️ About Sphere */}
            <IconButton onClick={handleAboutClick}>
              <InfoOutlined sx={{ fontSize: "28px", color: "#ff0077" }} />
            </IconButton>

            {/* 🚪 Logout */}
            <Button
              onClick={() => dispatch(setLogout())}
              sx={{
                backgroundColor: "#1E1E1E",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "1.2rem",
                padding: "0.5rem 1.2rem",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#1E1E1E",
                  transform: "scale(1.05)",
                },
              }}
            >
              Logout
            </Button>
          </FlexBetween>
        ) : (
          <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
            {isMobileMenuToggled ? <Close /> : <MenuIcon />}
          </IconButton>
        )}
      </FlexBetween>

      {/* 🪩 ABOUT SPHERE POPUP */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleAboutClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            backgroundColor: background,
            padding: "1.5rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 20px #1E1E1E",
            maxWidth: "300px",
          },
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          color={theme.palette.primary.main}
          gutterBottom
        >
          About Sphere
        </Typography>
        <Typography color={theme.palette.neutral.main}>
          Sphere is your social universe — connect, share, and explore a world
          built around you. Designed for creators and friends alike.
        </Typography>
      </Popover>
    </Box>
  );
};

export default Navbar;
