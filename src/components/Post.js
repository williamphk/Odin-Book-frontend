import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MaterialIcon from "./MaterialIcon";
import PostModal from "./PostModal";
import MenuModal from "./MenuModal";
import { getPostContent, updatePost } from "../api";
import { incrementCreateOrUpdateCount } from "../slices/postSlice";

const Post = ({ post, id }) => {
  const [isPostMenuOpen, setPostMenuOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("loading...");

  const token = useSelector((state) => state.auth.token);

  const openPostModal = async () => {
    setIsPostModalOpen(true);
    const response = await getPostContent(token, id);
    setPostContent(response.data.post.content);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  function formatDate(date) {
    const inputDate = new Date(date);
    return inputDate.toLocaleDateString("en-US");
  }

  const handlePostDelete = () => {};

  const menuItems = [
    {
      name: "Edit",
      isLink: false,
      onClick: openPostModal,
    },
    {
      name: "Delete",
      isLink: false,
      onClick: handlePostDelete,
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

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    updatePost(data, token, id);
    closePostModal();
    dispatch(incrementCreateOrUpdateCount());
  };

  return (
    <div
      key={post._id}
      id={id}
      className="bg-white w-1/2 rounded pt-4 px-4 mb-4 shadow"
    >
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
            <p>{formatDate(post.createdAt)}</p>
          </div>
        </div>
        <div className="relative">
          <button onClick={togglePostMenu} ref={menuRef}>
            <MaterialIcon
              className="material-symbols-outlined text-3xl"
              iconName={"more_horiz"}
            />
          </button>
          {isPostMenuOpen && <MenuModal menuItems={menuItems} />}
        </div>
      </div>
      <div className="py-2 break-all text-left">
        <p>{post.content}</p>
      </div>
      <div className="flex justify-between py-2">
        <button>Number of likes</button>
        <button>Number of comments</button>
      </div>
      <div className="border-t pt-1 pb-1">
        <button className="text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-1/2 disabled:hover:bg-transparent outline-plum-600">
          Like
        </button>
        <button className="text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-1/2 disabled:hover:bg-transparent outline-plum-600">
          Comment
        </button>
      </div>
      <PostModal
        title="Edit"
        value={postContent}
        setPostContent={setPostContent}
        isOpen={isPostModalOpen}
        closePostModal={closePostModal}
        button="Save"
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Post;
