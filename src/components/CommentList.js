import React from "react";
import { useSelector } from "react-redux";

import CommentField from "./CommentField";
import Comment from "./Comment";
import { createComment } from "../api";

const CommentList = ({ postId, comments, token }) => {
  const user = useSelector((state) => state.auth.user);

  const onSubmit = async (data) => {
    await createComment(data, token, postId);
  };

  return (
    <div>
      <div className="flex gap-x-2 items-start">
        <button>
          <img
            src={user.picture}
            alt="Profile picture"
            className="w-10 h-10 rounded-full"
          />
        </button>
        <CommentField postId={postId} onSubmit={onSubmit} />
      </div>
      <div>
        {comments.map((comment) => (
          <Comment
            comment={comment}
            postId={postId}
            commentId={comment._id}
            key={comment._id}
            token={token}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
