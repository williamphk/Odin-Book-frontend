// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import commentReducer from "./slices/commentSlice";
import pageReducer from "./slices/pageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comment: commentReducer,
    page: pageReducer,
  },
});
