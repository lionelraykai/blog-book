import axios from "axios";
const BASE_URL = process.env.REACT_APP_API;

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(async (req) => {
  const token = localStorage.getItem("token");
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

API.interceptors.response.use(
  async (res) => {
    return res;
  },
  (error) => {
    if (error.response?.status === 401) {
      throw error;
    }
    throw error;
  }
);

export const login = (formData) => API.post("/auth/login", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);
export const getUserProfile = (id) => API.get(`/auth/profile/${id}`);
export const updateUserProfile = (formData, id) =>
  API.put(`/auth/profile/${id}`, formData);
export const updateProfilePhoto = (formData, id) =>
  API.patch(`/auth/profile/${id}`, formData);
export const createBlog = (formData) => API.post("/posts", formData);
export const deleteBlog = (id) => API.delete(`/posts/${id}`);
export const getBlog = () => API.get("/posts");
export const getBlogDetails = (id) => API.get(`/posts/${id}`);
export const updateBlog = (formData, id) => API.put(`/posts/${id}`, formData);
export const updateBlogByPatch = (formData, id) =>
  API.patch(`/posts/${id}`, formData);
export const blogComments = (formData, id) =>
  API.post(`/posts/${id}/comments`, formData);

export const deleteComment = (postId, commentId) =>
  API.delete(`/posts/${postId}/comments/${commentId}`);

export const getFilteredPosts = (title, createdAt) =>
  API.get(`/filtered-posts?title=${title}&createdAt=${createdAt}`);

export const sendMail = (email) => API.post(`/auth/send-email`, email);

export const searchData = (searchText) =>
  API.get(`/searchData?searchText=${searchText}`);
