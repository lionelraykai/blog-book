import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../actions/auth";
const initialState = {
  user: [],
  loading: false,
  error: null,
};
export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.loginUser(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.loginUser(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.loginUser(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
