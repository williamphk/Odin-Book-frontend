// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const createPost = async (newPost, token) => {
  try {
    const response = await api.post("/posts", newPost, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in createPost:", error);
    throw error;
  }
};

export const getNewsFeed = async (token) => {
  try {
    const response = await api.get("/posts/newsfeed", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in getNewsFeed:", error);
    throw error;
  }
};

export const getPostContent = async (token, postId) => {
  try {
    const response = await api.get("/posts/" + postId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in getPostContent:", error);
    throw error;
  }
};

export const updatePost = async (updatedPost, token, postId) => {
  try {
    const response = await api.put("/posts/" + postId, updatedPost, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in updatePost:", error);
    throw error;
  }
};

export const deletePost = async (token, postId) => {
  try {
    const response = await api.delete("/posts/" + postId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in deletePost:", error);
    throw error;
  }
};

export const getCommentList = async (token, postId) => {
  try {
    const response = await api.get("/posts/" + postId + "/comments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error in getCommentList:", error);
    throw error;
  }
};

export const createComment = async (newComment, token, postId) => {
  try {
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
  } catch (error) {
    console.error("Error in createComment:", error);
    throw error;
  }
};

export const getCommentContent = async (token, postId, commentId) => {
  try {
    const response = await api.get(
      "/posts/" + postId + "/comments/" + commentId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in getCommentContent:", error);
    throw error;
  }
};

export const updateComment = async (
  token,
  postId,
  commentId,
  updatedComment
) => {
  try {
    const response = await api.put(
      "/posts/" + postId + "/comments/" + commentId,
      updatedComment,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in updateComment:", error);
    throw error;
  }
};

export const deleteComment = async (token, postId, commentId) => {
  try {
    const response = await api.delete(
      "/posts/" + postId + "/comments/" + commentId,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
  } catch (error) {
    console.error("Error in deleteComment:", error);
    throw error;
  }
};

export const getPostLikeList = async (token, postId) => {
  try {
    const response = await api.get("/posts/" + postId + "/likes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error in getPostLikeList:", error);
    throw error;
  }
};

export const createPostLike = async (token, postId) => {
  try {
    const response = await api.post(
      "/posts/" + postId + "/likes",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
  } catch (error) {
    console.error("Error in createPostLike:", error);
    throw error;
  }
};

export const deletePostLike = async (token, postId, likeId) => {
  try {
    const response = await api.delete("/posts/" + postId + "/likes/" + likeId, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error in deletePostLike:", error);
    throw error;
  }
};

export const getCommentLikeList = async (token, postId, commentId) => {
  try {
    const response = await api.get(
      "/posts/" + postId + "/comments/" + commentId + "/likes",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
  } catch (error) {
    console.error("Error in getCommentLikeList:", error);
    throw error;
  }
};

export const createCommentLike = async (token, postId, commentId) => {
  try {
    const response = await api.post(
      "/posts/" + postId + "/comments/" + commentId + "/likes",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in createCommentLike:", error);
    throw error;
  }
};

export const deleteCommentLike = async (token, postId, commentId, likeId) => {
  try {
    const response = await api.delete(
      "/posts/" + postId + "/comments/" + commentId + "/likes/" + likeId,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
  } catch (error) {
    console.error("Error in deleteCommentLike:", error);
    throw error;
  }
};

export const getFriendRequestsReceived = async (token) => {
  try {
    const response = await api.get("/friend-requests/received", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error in getFriendRequestsReceived:", error);
    throw error;
  }
};

export const getFriendSuggestion = async (token, userId) => {
  try {
    const response = await api.get("/users/" + userId + "/friends/suggestion", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error in getFriendSuggestion:", error);
    throw error;
  }
};

export const sendFriendRequest = async (token, receiverId) => {
  try {
    const response = await api.post(
      "/friend-requests",
      { receiverId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
  } catch (error) {
    console.error("Error in sendFriendRequest:", error);
    throw error;
  }
};

export const getFriendRequestsSent = async (token) => {
  try {
    const response = await api.get("/friend-requests/sent", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error in getFriendRequestsSent:", error);
    throw error;
  }
};

export const deleteFriendRequest = async (token, friendRequestId) => {
  try {
    const response = await api.delete("/friend-requests/" + friendRequestId, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.error("Error in deleteFriendRequest:", error);
    throw error;
  }
};

export default api;
