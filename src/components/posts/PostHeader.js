import React from "react";

import FormattedDate from "../common/FormattedDate";
import MaterialIcon from "../common/MaterialIcon";
import MenuModal from "../common/MenuModal";

const PostHeader = ({
  post,
  togglePostMenu,
  openPostEditModal,
  openPostDeleteModal,
  menuRef,
  isPostMenuOpen,
}) => {
  const menuItems = [
    {
      name: "Edit",
      isLink: false,
      onClick: openPostEditModal,
    },
    {
      name: "Delete",
      isLink: false,
      onClick: openPostDeleteModal,
    },
  ];

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
      <div className="relative">
        <button
          className="hover:bg-gray-100 rounded-full h-10 w-10 flex justify-center items-center"
          onClick={togglePostMenu}
          ref={menuRef}
        >
          <MaterialIcon
            className="material-symbols-outlined text-3xl"
            iconName={"more_horiz"}
          />
        </button>
        {isPostMenuOpen && <MenuModal menuItems={menuItems} />}
      </div>
    </div>
  );
};

export default PostHeader;
