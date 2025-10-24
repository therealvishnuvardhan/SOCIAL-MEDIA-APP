import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user?.friends) || [];

  const [loading, setLoading] = useState(true);

  const getFriends = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      // Ensure the backend response is always an array
      const friendsArray = Array.isArray(data) ? data : [];

      // Update Redux state
      dispatch(setFriends({ friends: friendsArray }));
    } catch (err) {
      console.error("Error fetching friends:", err);
      dispatch(setFriends({ friends: [] }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFriends();
  }, [userId]);

  if (loading) return <Typography>Loading friends...</Typography>;

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))
        ) : (
          <Typography>No friends found</Typography>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
