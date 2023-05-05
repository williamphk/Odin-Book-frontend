import React from "react";
import { useSelector } from "react-redux";

import CommentField from "./CommentField";
import Comment from "./Comment";

const CommentList = ({ id, comments }) => {
  const user = useSelector((state) => state.auth.user);

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
        <CommentField id={id} />
      </div>
      <div>
        {comments.map((comment) => (
          <Comment comment={comment} id={id} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
