import React from "react";

import Comment from "./Comment";

const CommentList = ({ postId, comments, token }) => {
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
