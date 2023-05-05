import React, { useState } from "react";
import { useSelector } from "react-redux";

import CommentField from "./CommentField";
import { getCommentContent } from "../api";

const Comment = ({ comment, postId, commentId }) => {
  const token = useSelector((state) => state.auth.token);

  const [isEdit, setIsEdit] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const handleEditButton = async () => {
    setIsEdit(!isEdit);
    const response = await getCommentContent(token, postId, commentId);
    console.log(postId, commentId);
    setCommentContent(response.data.comment.content);
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
        <CommentField postId={postId} commentContent={commentContent} />
      ) : (
        <div className="flex flex-col items-start">
          <div className="flex flex-col bg-gray-100 rounded-xl px-3 py-1 text-sm items-start">
            <button>{comment.user.profile.fullName}</button>
            <div>{comment.content}</div>
          </div>
          <div className="flex gap-x-2 pl-2">
            <button className="pl-1 text-sm">Like</button>
            <button className="pl-1 text-sm" onClick={handleEditButton}>
              Edit
            </button>
            <button className="pl-1 text-sm">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
