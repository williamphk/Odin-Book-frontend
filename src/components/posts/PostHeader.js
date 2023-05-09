import React from "react";
import { useSelector } from "react-redux";

import FormattedDate from "../common/FormattedDate";
import PostMenu from "./PostMenu";

const PostHeader = ({ post, postId }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-x-2">
        <button>
          <img
            src={post.user.profile.picture}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </button>
        <div className="flex flex-col items-start">
          <p className="font-bold hover:underline cursor-pointer">
            {post.user.profile.fullName}
          </p>

          <FormattedDate
            className="pl-1 text-sm text-gray-500"
            date={new Date(post.createdAt)}
          ></FormattedDate>
        </div>
      </div>
      {user._id === post.user._id && <PostMenu postId={postId} />}
    </div>
  );
};

export default PostHeader;
