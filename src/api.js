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

export const getPostContent = async (token, postId) => {
  const response = await api.get("/posts/" + postId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updatePost = async (updatedPost, token, postId) => {
  const response = await api.put("/posts/" + postId, updatedPost, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const deletePost = async (token, postId) => {
  const response = await api.delete("/posts/" + postId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getCommentList = async (token, postId) => {
  const response = await api.get("/posts/" + postId + "/comments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const createComment = async (newComment, token, postId) => {
  const response = await api.post(
    "/posts/" + postId + "/comments",
    newComment,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getCommentContent = async (token, postId, commentId) => {
  const response = await api.get(
    "/posts/" + postId + "/comments/" + commentId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const updateComment = async (
  token,
  postId,
  commentId,
  updatedComment
) => {
  const response = await api.put(
    "/posts/" + postId + "/comments/" + commentId,
    updatedComment,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};

export const deleteComment = async (token, postId, commentId) => {
  const response = await api.delete(
    "/posts/" + postId + "/comments/" + commentId,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response;
};

export const getPostLikeList = async (token, postId) => {
  const response = await api.get("/posts/" + postId + "/likes", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const createPostLike = async (token, postId) => {
  const response = await api.post(
    "/posts/" + postId + "/likes",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};

export const deletePostLike = async (token, postId, likeId) => {
  const response = await api.delete("/posts/" + postId + "/likes/" + likeId, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const getCommentLikeList = async (token, postId, commentId) => {
  const response = await api.get(
    "/posts/" + postId + "/comments/" + commentId + "/likes",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};

export const createCommentLike = async (token, postId, commentId) => {
  const response = await api.post(
    "/posts/" + postId + "/comments/" + commentId + "/likes",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};

export const deleteCommentLike = async (token, postId, commentId, likeId) => {
  const response = await api.delete(
    "/posts/" + postId + "/comments/" + commentId + "/likes/" + likeId,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response;
};

export const getFriendRequests = async (token) => {
  const response = await api.get("/friend-requests", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const getFriendSuggestion = async (token, userId) => {
  const response = await api.get("/users/" + userId + "/friends/suggestion", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export default api;
