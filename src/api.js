// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const createPost = async (newPost) => {
  const response = await apiClient.post("/posts", newPost, {
    headers: {
      "Content-Type": "application/json",
      // Add any additional headers, like authentication tokens, if required
    },
  });
  return response.data;
};

export default api;
