import React from "react";
import { useSelector, useDispatch } from "react-redux";

import CommentField from "./CommentField";
import { createComment } from "../../api";
import { incrementCreateOrUpdateCount } from "../../slices/commentSlice";

const AddComment = ({ postId, token }) => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const onCommentSubmit = async (data) => {
    await createComment(data, token, postId);
    dispatch(incrementCreateOrUpdateCount());
  };

  return (
    <div className="flex gap-x-2 items-start">
      <button>
        <img
          src={user.picture}
          alt="Profile picture"
          className="w-10 h-10 rounded-full"
        />
      </button>
      <CommentField postId={postId} onSubmit={onCommentSubmit} />
    </div>
  );
};

export default AddComment;
