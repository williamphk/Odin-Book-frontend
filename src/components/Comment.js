import React, { useState } from "react";

import CommentField from "./CommentField";

const Comment = ({
  comment,
  setCommentContent,
  handleCommentSubmit,
  commentContent,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEditButton = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className="flex m-1 gap-x-2">
      <button>
        <img
          src={comment.user.profile.picture}
          alt="Profile picture"
          className="w-10 h-10 rounded-full"
        />
      </button>
      {isEdit ? (
        <CommentField
          setCommentContent={setCommentContent}
          handleCommentSubmit={handleCommentSubmit}
          commentContent={commentContent}
        />
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
