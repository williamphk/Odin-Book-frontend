// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import postReducer from "./slices/postSlice";
import commentReducer from "./slices/commentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comment: commentReducer,
  },
});
