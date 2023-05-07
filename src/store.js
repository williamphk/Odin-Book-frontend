// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import commentReducer from "./slices/commentSlice";
import pageReducer from "./slices/pageSlice";
import friendRequestReducer from "./slices/friendRequestSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comment: commentReducer,
    page: pageReducer,
    friendRequest: friendRequestReducer,
  },
});
