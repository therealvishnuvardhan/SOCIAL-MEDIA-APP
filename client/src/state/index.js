import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null, // will be set on login
  token: null,
  posts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      // Ensure friends is always an array
      state.user = {
        ...action.payload.user,
        friends: Array.isArray(action.payload.user.friends)
          ? action.payload.user.friends
          : [],
      };
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.posts = [];
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    updatePost: (state, action) => {
      const updatedPosts = state.posts.map((post) =>
        post._id === action.payload.post._id ? action.payload.post : post
      );
      state.posts = updatedPosts;
    },
    setFriends: (state, action) => {
      if (state.user) {
        // Always make friends an array
        state.user.friends = Array.isArray(action.payload.friends)
          ? action.payload.friends
          : [];
      }
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setPosts,
  updatePost,
  setFriends,
} = authSlice.actions;

export default authSlice.reducer;
