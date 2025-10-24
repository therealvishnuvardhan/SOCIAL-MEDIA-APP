import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { Typography } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts || []);
  const token = useSelector((state) => state.token);

  const getPosts = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (Array.isArray(data)) dispatch(setPosts({ posts: data }));
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  }, [token, dispatch]);

  const getUserPosts = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (Array.isArray(data)) dispatch(setPosts({ posts: data }));
    } catch (err) {
      console.error("Error fetching user posts:", err);
    }
  }, [userId, token, dispatch]);

  useEffect(() => {
    if (isProfile) getUserPosts();
    else getPosts();
  }, [getPosts, getUserPosts, isProfile]);

  if (!Array.isArray(posts) || posts.length === 0)
    return <Typography>No posts to display.</Typography>;

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
