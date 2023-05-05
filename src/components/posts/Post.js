import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MaterialIcon from "../common/MaterialIcon";
import PostModal from "./PostModal";
import MenuModal from "../common/MenuModal";
import {
  getPostContent,
  updatePost,
  deletePost,
  getCommentList,
  getPostLikeList,
  createPostLike,
} from "../../api";
import { incrementCreateOrUpdateCount } from "../../slices/postSlice";
import CommentList from "../comments/CommentList";
import AddComment from "../comments/AddComment";
import FormattedDate from "../common/FormattedDate";

const Post = ({ post, id }) => {
  const [isPostMenuOpen, setPostMenuOpen] = useState(false);
  const [isPostEditModalOpen, setIsPostEditModalOpen] = useState(false);
  const [isPostDeleteModalOpen, setIsPostDeleteModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("loading...");
  const [isCommentShow, setIsCommentShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [postLikes, setPostLikes] = useState([]);

  const token = useSelector((state) => state.auth.token);

  const createOrUpdateCount = useSelector(
    (state) => state.comment.createOrUpdateCount
  );

  const openPostEditModal = async () => {
    setIsPostEditModalOpen(true);
    const response = await getPostContent(token, id);
    setPostContent(response.data.post.content);
  };

  const openPostDeleteModal = async () => {
    setIsPostDeleteModalOpen(true);
    const response = await getPostContent(token, id);
    setPostContent(response.data.post.content);
  };

  const closePostModal = () => {
    setIsPostEditModalOpen(false);
    setIsPostDeleteModalOpen(false);
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

  const dispatch = useDispatch();

  const onEditSubmit = (data) => {
    updatePost(data, token, id);
    closePostModal();
    dispatch(incrementCreateOrUpdateCount());
  };

  const onDeleteSubmit = () => {
    deletePost(token, id);
    closePostModal();
    dispatch(incrementCreateOrUpdateCount());
  };

  const handleCommentShow = async () => {
    setIsCommentShow(!isCommentShow);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentList(token, id);
        setComments(fetchedComments.data.comments);
      } catch (err) {
        setComments(err);
      }
    };

    fetchComments();
  }, [isCommentShow, createOrUpdateCount]);

  useEffect(() => {
    const fetchPostLikes = async () => {
      try {
        const fetchedLikes = await getPostLikeList(token, id);
        setPostLikes(fetchedLikes.data.likes);
      } catch (err) {
        setPostLikes(err);
      }
    };

    fetchPostLikes();
  }, []);

  const handleLikeButton = async () => {
    await createPostLike(token, id);
  };

  return (
    <div
      key={post._id}
      id={id}
      className="bg-white w-1/2 rounded py-4 px-4 mb-4 shadow"
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
      <div className="py-2 break-all text-left">
        <p>{post.content}</p>
      </div>
      <div className="flex justify-between py-2">
        {postLikes && (
          <button className="flex gap-x-1 items-center">
            <MaterialIcon
              className="material-symbols-outlined text-xl text-purple-500"
              iconName={"thumb_up"}
            />
            {postLikes.length}
          </button>
        )}
        <button
          className="hover:underline text-gray-500 text-sm"
          onClick={handleCommentShow}
        >
          {comments.length} comments
        </button>
      </div>
      <div className="flex border-t border-b pt-1 pb-1 mb-3">
        <button
          onClick={handleLikeButton}
          className="text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-1/2 flex items-center justify-center gap-x-2"
        >
          <MaterialIcon
            className="material-symbols-outlined text-xl"
            iconName={"thumb_up"}
          />
          <div>Like</div>
        </button>
        <button
          className="text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-1/2 flex items-center justify-center gap-x-2"
          onClick={handleCommentShow}
        >
          <MaterialIcon
            className="material-symbols-outlined text-xl"
            iconName={"add_comment"}
          />
          Comment
        </button>
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
      {isCommentShow && (
        <CommentList postId={id} comments={comments} token={token} />
      )}
      <AddComment postId={id} token={token} />
    </div>
  );
};

export default Post;
