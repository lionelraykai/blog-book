import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./reducers/counterSlice";
import { postSlice } from "./reducers/postSlice";
import { authSlice } from "./reducers/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    posts: postSlice.reducer,
  },
});
