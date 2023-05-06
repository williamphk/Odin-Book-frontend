import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FormattedDate from "../common/FormattedDate";
import MaterialIcon from "../common/MaterialIcon";
import MenuModal from "../common/MenuModal";
import PostModal from "./PostModal";
import { getPostContent, updatePost, deletePost } from "../../api";
import { incrementCreateOrUpdateCount } from "../../slices/postSlice";

const PostHeader = ({ post, postId }) => {
  const [isPostEditModalOpen, setIsPostEditModalOpen] = useState(false);
  const [isPostDeleteModalOpen, setIsPostDeleteModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("loading...");
  const [isPostMenuOpen, setPostMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const openPostEditModal = async () => {
    setIsPostEditModalOpen(true);
    const response = await getPostContent(token, postId);
    setPostContent(response.data.post.content);
  };

  const openPostDeleteModal = async () => {
    setIsPostDeleteModalOpen(true);
    const response = await getPostContent(token, postId);
    setPostContent(response.data.post.content);
  };

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

  const menuRef = useRef(null);

  const togglePostMenu = () => {
    setPostMenuOpen(!isPostMenuOpen);
  };

  const handleClickOutside = (event) => {
    // If the menu is mounted in the DOM and the clicked element is not one of the menu items
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setPostMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      // When the Navbar component is unmounted, the event listener is removed
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const closePostModal = () => {
    setIsPostEditModalOpen(false);
    setIsPostDeleteModalOpen(false);
  };

  const onEditSubmit = (data) => {
    updatePost(data, token, postId);
    closePostModal();
    dispatch(incrementCreateOrUpdateCount());
  };

  const onDeleteSubmit = () => {
    deletePost(token, postId);
    closePostModal();
    dispatch(incrementCreateOrUpdateCount());
  };

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
      {isPostEditModalOpen && (
        <PostModal
          title="Edit"
          value={postContent}
          setPostContent={setPostContent}
          closePostModal={closePostModal}
          requiredInputField={true}
          button="Save"
          onSubmit={onEditSubmit}
        />
      )}
      {isPostDeleteModalOpen && (
        <PostModal
          title="Delete"
          closePostModal={closePostModal}
          button="Confirm"
          onSubmit={onDeleteSubmit}
          buttonColor="bg-red-500"
          buttonHoverColor="bg-red-600"
        />
      )}
    </div>
  );
};

export default PostHeader;
