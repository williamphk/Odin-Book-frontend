import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import MaterialIcon from "../common/MaterialIcon";
import {
  getCommentList,
  getPostLikeList,
  createPostLike,
  deletePostLike,
} from "../../api";
import CommentList from "../comments/CommentList";
import AddComment from "../comments/AddComment";

const Post = ({ post, id }) => {
  const [isCommentShow, setIsCommentShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [userLikeId, setUserLikeId] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const createOrUpdateCount = useSelector(
    (state) => state.comment.createOrUpdateCount
  );

  const handleCommentShow = async () => {
    setIsCommentShow(!isCommentShow);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentList(token, id);
        setComments(fetchedComments.data.comments);
      } catch (err) {
        setComments(err);
      }
    };

    fetchComments();
  }, [isCommentShow, createOrUpdateCount]);

  useEffect(() => {
    const fetchPostLikes = async () => {
      try {
        const fetchedLikes = await getPostLikeList(token, id);
        setPostLikes(fetchedLikes.data.likes);
      } catch (err) {
        setPostLikes(err);
      }
    };

    fetchPostLikes();
  }, [postLikes, isLike]);

  const handleLikeButtonClick = () => {
    if (isLike) {
      // Delete the like
      deletePostLike(token, id, userLikeId);
    } else {
      // Create a new like
      createPostLike(token, id);
    }
  };

  useEffect(() => {
    const userLike = postLikes.find((like) => like.user._id === user._id);
    if (userLike) {
      setIsLike(true);
      setUserLikeId(userLike._id);
    } else {
      setIsLike(false);
      setUserLikeId(null);
    }
  }, [postLikes]);

  return (
    <div
      key={post._id}
      id={id}
      className="bg-white w-1/2 rounded py-4 px-4 mb-4 shadow"
    >
      <PostHeader post={post} postId={id} />
      <PostContent post={post} />
      <div className="flex justify-between py-2">
        {postLikes && (
          <button className="flex gap-x-1 items-center">
            <MaterialIcon
              className="material-symbols-outlined text-xl text-purple-500"
              iconName={"thumb_up"}
            />
            {postLikes.length}
          </button>
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
          className="text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-1/2 flex items-center justify-center gap-x-2"
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
          className="text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-1/2 flex items-center justify-center gap-x-2"
          onClick={handleCommentShow}
        >
          <MaterialIcon
            className="material-symbols-outlined text-xl"
            iconName={"add_comment"}
          />
          Comment
        </button>
      </div>
      {isCommentShow && (
        <CommentList postId={id} comments={comments} token={token} />
      )}
      <AddComment
        postId={id}
        token={token}
        setIsCommentShow={setIsCommentShow}
      />
    </div>
  );
};

export default Post;
