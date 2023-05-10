import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import MaterialIcon from "../common/MaterialIcon";
import { getPostLikeList, createPostLike, deletePostLike } from "../../api";

const PostAction = ({ handleCommentShow, comments, postId, user, token }) => {
  const [postLikes, setPostLikes] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [userLikeId, setUserLikeId] = useState(null);
  const [fetchLikesTrigger, setFetchLikesTrigger] = useState(false);

  useEffect(() => {
    const fetchPostLikes = async () => {
      try {
        const fetchedLikes = await getPostLikeList(token, postId);
        setPostLikes(fetchedLikes.data.likes);
      } catch (err) {
        setPostLikes(err);
      }
    };

    fetchPostLikes();
  }, [fetchLikesTrigger]);

  useEffect(() => {
    const userLike = postLikes.find((like) => like.user._id === user._id);
    if (userLike) {
      setUserLikeId(userLike._id);
      setIsLike(true);
    } else {
      setUserLikeId(null);
      setIsLike(false);
    }
  }, [postLikes]);

  const handleLikeButtonClick = async () => {
    if (isLike) {
      // Delete the like
      await deletePostLike(token, postId, userLikeId);
      setFetchLikesTrigger(!fetchLikesTrigger);
    } else {
      // Create a new like
      await createPostLike(token, postId);
      setFetchLikesTrigger(!fetchLikesTrigger);
    }
  };

  return (
    <div>
      <div className="flex justify-between py-2">
        {postLikes.length > 0 ? (
          <button className="flex gap-x-1 items-center">
            <MaterialIcon
              className="material-symbols-outlined text-xl text-purple-500"
              iconName={"thumb_up"}
            />
            {postLikes.length}
          </button>
        ) : (
          <div className="h-7"></div>
        )}
        <button
          className="hover:underline text-gray-500 text-sm"
          onClick={handleCommentShow}
        >
          {comments.length} comments
        </button>
      </div>
      <div className="flex border-t border-b pt-1 pb-1 mb-3">
        <button
          onClick={handleLikeButtonClick}
          className="text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-1/2 flex items-center justify-center gap-x-2 transition duration-200"
        >
          <MaterialIcon
            className={`material-symbols-outlined text-xl ${
              isLike ? "text-purple-600" : "text-gray-500"
            }`}
            iconName={"thumb_up"}
          />

          <div
            className={
              isLike
                ? "text-purple-600" // Purple when user has liked the post
                : "text-gray-500" // Default color when user hasn't liked the post
            }
          >
            Like
          </div>
        </button>
        <button
          className="text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-1/2 flex items-center justify-center gap-x-2 transition duration-200"
          onClick={handleCommentShow}
        >
          <MaterialIcon
            className="material-symbols-outlined text-xl"
            iconName={"add_comment"}
          />
          Comment
        </button>
      </div>
    </div>
  );
};

export default PostAction;
