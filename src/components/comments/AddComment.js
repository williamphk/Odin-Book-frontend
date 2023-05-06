import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import CommentField from "./CommentField";
import { createComment } from "../../api";
import { incrementCreateOrUpdateCount } from "../../slices/commentSlice";

const AddComment = ({ postId, token, setIsCommentShow }) => {
  const [commentContent, setCommentContent] = useState("");

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const onCommentSubmit = async (data) => {
    await createComment(data, token, postId);
    dispatch(incrementCreateOrUpdateCount());
    setIsCommentShow(true);
    setCommentContent("");
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
      <CommentField
        postId={postId}
        onSubmit={onCommentSubmit}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
      />
    </div>
  );
};

export default AddComment;
