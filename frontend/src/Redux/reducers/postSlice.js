import { createSlice } from "@reduxjs/toolkit";
import { getPost,getPostForFilter,fetchFilteredPosts } from "../actions/post";
const initialState = {
  posts: [],
  postsForFilter:[],
  loading: false,
  error: null,
};
export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getPostForFilter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPostForFilter.fulfilled, (state, action) => {
      state.loading = false;
      state.postsForFilter = action.payload;
    });
    builder.addCase(getPostForFilter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchFilteredPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilteredPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchFilteredPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
