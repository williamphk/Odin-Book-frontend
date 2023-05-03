import React from "react";

import MaterialIcon from "./MaterialIcon";
import MenuModal from "./MenuModal";

const Post = ({ post }) => {
  function formatDate(date) {
    const inputDate = new Date(date);
    return inputDate.toLocaleDateString("en-US");
  }

  const handlePostEdit = () => {};
  const handlePostDelete = () => {};

  const menuItems = [
    {
      name: "Edit",
      isLink: false,
      onClick: handlePostEdit,
    },
    {
      name: "Delete",
      isLink: false,
      onClick: handlePostDelete,
    },
  ];

  return (
    <div key={post._id} className="bg-white w-1/2 rounded p-4 mb-4 shadow">
      <div className="flex justify-between">
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
            <p>{formatDate(post.createdAt)}</p>
          </div>
        </div>
        <div className="relative">
          <button>
            <MaterialIcon
              className="material-symbols-outlined text-4xl"
              iconName={"more_horiz"}
            />
          </button>
          <MenuModal menuItems={menuItems} />
        </div>
      </div>
      <div className="py-2 break-all text-left">
        <p>{post.content}</p>
      </div>
      <div className="flex justify-between py-2">
        <button>Number of likes</button>
        <button>Number of comments</button>
      </div>
      <div className="border-t">
        <button className="text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-1/2 disabled:hover:bg-transparent outline-plum-600">
          Like
        </button>
        <button className="text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-1/2 disabled:hover:bg-transparent outline-plum-600">
          Comment
        </button>
      </div>
    </div>
  );
};

export default Post;
