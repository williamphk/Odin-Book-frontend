// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const createPost = async (newPost, token) => {
  const response = await api.post("/posts", newPost, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getNewsFeed = async (token) => {
  const response = await api.get("/posts/newsfeed", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export default api;
