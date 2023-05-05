import React, { useState } from "react";

import CommentField from "./CommentField";
import { getCommentContent, updateComment, deleteComment } from "../api";
import FormattedDate from "./FormattedDate";

const Comment = ({ comment, postId, commentId, token }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const handleEditButton = async () => {
    setIsEdit(!isEdit);
    const response = await getCommentContent(token, postId, commentId);
    setCommentContent(response.data.comment.content);
  };

  const handleDeleteButton = async () => {
    await deleteComment(token, postId, commentId);
  };

  const onSubmit = async (data) => {
    const response = updateComment(token, postId, commentId, data);
    setIsEdit(!isEdit);
    return response;
  };

  return (
    <div className="flex m-1 gap-x-2" id={commentId}>
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
            <button>{comment.user.profile.fullName}</button>
            <div>{comment.content}</div>
          </div>
          <div className="flex gap-x-2 pl-2 items-center">
            <button className="pl-1 text-sm">Like</button>
            <button className="pl-1 text-sm" onClick={handleEditButton}>
              Edit
            </button>
            <button className="pl-1 text-sm" onClick={handleDeleteButton}>
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
