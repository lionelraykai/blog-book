import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBlog,
  createBlog,
  updateBlog,
  getFilteredPosts,
} from "../../API/endpoints";

export const getPost = createAsyncThunk("post/getPosts", async () => {
  try {
    const respose = await getBlog();
    return respose.data;
  } catch (err) {
    console.log(err, "error during fetching post data");
    return err;
  }
});

export const createPost = createAsyncThunk(
  "post/createPost",
  async (formData) => {
    try {
      const res = await createBlog(formData);
      return res;
    } catch (err) {
      console.log(err, "error during fetching create Post");
    }
  }
);
export const getPostForFilter = createAsyncThunk(
  "post/getPostForFilter",
  async () => {
    try {
      const respose = await getBlog();
      return respose.data;
    } catch (err) {
      console.log(err, "error during fetching post data");
      return err;
    }
  }
);
export const updatePosts = createAsyncThunk(
  "post/updatePost",
  async ({ formData, id }) => {
    try {
      const res = await updateBlog(formData, id);
      return res;
    } catch (err) {
      console.log(err, "error during fetching create Post");
    }
  }
);
export const fetchFilteredPosts = createAsyncThunk(
  "post/fetchFilteredPosts",
  async ({ title, createdAt }) => {
    try {
      const res = await getFilteredPosts(title, createdAt);
      return res.data;
    } catch (err) {
      console.log(err, "error during fetching create Post");
    }
  }
);
