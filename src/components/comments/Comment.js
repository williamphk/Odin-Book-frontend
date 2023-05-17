import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import CommentField from "./CommentField";
import {
  getCommentContent,
  updateComment,
  deleteComment,
  getCommentLikeList,
  createCommentLike,
  deleteCommentLike,
} from "../../api";
import FormattedDate from "../common/FormattedDate";
import { incrementCreateOrUpdateCount } from "../../slices/commentSlice";
import MaterialIcon from "../common/MaterialIcon";
import ProfilePic from "../common/ProfilePic";

const Comment = ({ comment, postId, commentId, token, user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [commentLikes, setCommentLikes] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [userLikeId, setUserLikeId] = useState(null);
  const [fetchLikesTrigger, setFetchLikesTrigger] = useState(false);

  const handleEditButton = async () => {
    setIsEdit(!isEdit);
    const response = await getCommentContent(token, postId, commentId);
    setCommentContent(response.data.comment.content);
  };

  const dispatch = useDispatch();

  const handleDeleteButton = async () => {
    await deleteComment(token, postId, commentId);
    dispatch(incrementCreateOrUpdateCount());
  };

  const onSubmit = async (data) => {
    const response = updateComment(token, postId, commentId, data);
    setIsEdit(!isEdit);
    dispatch(incrementCreateOrUpdateCount());
    setCommentContent("");
    return response;
  };

  useEffect(() => {
    const fetchCommentLikes = async () => {
      try {
        const fetchedLikes = await getCommentLikeList(token, postId, commentId);
        setCommentLikes(fetchedLikes.data.likes);
        console.log(fetchedLikes.data.likes);
      } catch (err) {
        setCommentLikes(err);
      }
    };

    fetchCommentLikes();
  }, [fetchLikesTrigger, token, postId, commentId]);

  useEffect(() => {
    const userLike = commentLikes.find((like) => like.user._id === user._id);
    if (userLike) {
      setUserLikeId(userLike._id);
      setIsLike(true);
    } else {
      setUserLikeId(null);
      setIsLike(false);
    }
  }, [commentLikes, user._id]);

  const handleLikeButtonClick = async () => {
    if (isLike) {
      // Delete the like
      await deleteCommentLike(token, postId, commentId, userLikeId);
      setFetchLikesTrigger(!fetchLikesTrigger);
    } else {
      // Create a new like
      await createCommentLike(token, postId, commentId);
      setFetchLikesTrigger(!fetchLikesTrigger);
    }
  };

  return (
    <div className="flex m-y-1 gap-x-2 mb-1" id={commentId}>
      <div className="items-start">
        <ProfilePic
          picture={comment.user.profile.picture}
          id={comment.user._id}
          className="w-10 h-10 object-cover rounded-full"
        />
      </div>

      {isEdit ? (
        <CommentField
          postId={postId}
          commentContent={commentContent}
          placeholder="Loading..."
          onSubmit={onSubmit}
          setCommentContent={setCommentContent}
        />
      ) : (
        <div className="flex flex-col items-start">
          <div className="flex flex-col bg-gray-100 rounded-xl px-3 py-1 text-sm items-start mb-1 relative">
            <button className="font-medium">
              {comment.user.profile.fullName}
            </button>
            <div>{comment.content}</div>
            {commentLikes.length > 0 && (
              <button className="absolute top-7 right-0 flex justify-center items-center gap-x-1 rounded-lg bg-white px-0.5 drop-shadow-xl">
                <MaterialIcon
                  className={`material-symbols-outlined text-lg text-purple-600`}
                  iconName={"thumb_up"}
                />
                <div>{commentLikes.length}</div>
              </button>
            )}
          </div>
          <div className="flex gap-x-2 pl-2 items-center">
            <button
              className={`pl-1 text-xs font-medium ${
                isLike ? "text-purple-600" : "text-black"
              }`}
              onClick={handleLikeButtonClick}
            >
              Like
            </button>
            {user._id === comment.user._id && (
              <button
                className="pl-1 text-xs font-medium"
                onClick={handleEditButton}
              >
                Edit
              </button>
            )}
            {user._id === comment.user._id && (
              <button
                className="pl-1 text-xs font-medium"
                onClick={handleDeleteButton}
              >
                Delete
              </button>
            )}
            <FormattedDate
              className="pl-1 text-xs text-gray-500"
              date={new Date(comment.createdAt)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
