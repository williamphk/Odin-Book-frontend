import React from "react";
import { useSelector } from "react-redux";

import Comment from "./Comment";

const CommentList = ({ postId, comments, token }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
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
