import React, { useState } from "react";

import CommentField from "./CommentField";
import { getCommentContent, updateComment, deleteComment } from "../api";
import FormattedDate from "./FormattedDate";
import { incrementCreateOrUpdateCount } from "../slices/commentSlice";
import { useDispatch } from "react-redux";

const Comment = ({ comment, postId, commentId, token }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [commentContent, setCommentContent] = useState("");

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
    return response;
  };

  return (
    <div className="flex m-y-1 gap-x-2" id={commentId}>
      <button>
        <img
          src={comment.user.profile.picture}
          alt="Profile picture"
          className="w-10 h-10 rounded-full"
        />
      </button>
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
          <div className="flex flex-col bg-gray-100 rounded-xl px-3 py-1 text-sm items-start">
            <button className="font-medium">
              {comment.user.profile.fullName}
            </button>
            <div>{comment.content}</div>
          </div>
          <div className="flex gap-x-2 pl-2 items-center">
            <button className="pl-1 text-xs font-medium">Like</button>
            <button
              className="pl-1 text-xs font-medium"
              onClick={handleEditButton}
            >
              Edit
            </button>
            <button
              className="pl-1 text-xs font-medium"
              onClick={handleDeleteButton}
            >
              Delete
            </button>
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
