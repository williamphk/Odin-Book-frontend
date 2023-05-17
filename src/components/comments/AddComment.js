import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import CommentField from "./CommentField";
import { createComment } from "../../api";
import { incrementCreateOrUpdateCount } from "../../slices/commentSlice";
import ProfilePic from "../common/ProfilePic";

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
      <ProfilePic
        picture={user.picture}
        id={user._id}
        className="w-10 h-10 object-cover rounded-full"
      />
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
