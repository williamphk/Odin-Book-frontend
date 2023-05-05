import React from "react";
import { useSelector } from "react-redux";

import CommentField from "./CommentField";

const Comment = ({
  setCommentContent,
  handleCommentSubmit,
  commentContent,
  comments,
}) => {
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
        <CommentField
          setCommentContent={setCommentContent}
          handleCommentSubmit={handleCommentSubmit}
          commentContent={commentContent}
        />
      </div>
      <div>
        {comments.map((comment) => (
          <div className="flex m-1 gap-x-2">
            <button>
              <img
                src={comment.user.profile.picture}
                alt="Profile picture"
                className="w-10 h-10 rounded-full"
              />
            </button>
            <div className="flex flex-col items-start">
              <div className="flex flex-col bg-gray-100 rounded-xl px-3 py-1 text-sm items-start">
                <button>{comment.user.profile.fullName}</button>
                <div>{comment.content}</div>
              </div>
              <div className="flex gap-x-2 pl-2">
                <button className="pl-1 text-sm">Like</button>
                <button className="pl-1 text-sm">Edit</button>
                <button className="pl-1 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
