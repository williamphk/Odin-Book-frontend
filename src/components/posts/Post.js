import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import MaterialIcon from "../common/MaterialIcon";
import PostModal from "./PostModal";
import {
  getPostContent,
  updatePost,
  deletePost,
  getCommentList,
  getPostLikeList,
  createPostLike,
  deletePostLike,
} from "../../api";
import { incrementCreateOrUpdateCount } from "../../slices/postSlice";
import CommentList from "../comments/CommentList";
import AddComment from "../comments/AddComment";

const Post = ({ post, id }) => {
  const [isPostMenuOpen, setPostMenuOpen] = useState(false);
  const [isPostEditModalOpen, setIsPostEditModalOpen] = useState(false);
  const [isPostDeleteModalOpen, setIsPostDeleteModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("loading...");
  const [isCommentShow, setIsCommentShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [userLikeId, setUserLikeId] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

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
  }, [postLikes, isLike]);

  const handleLikeButtonClick = () => {
    if (isLike) {
      // Delete the like
      deletePostLike(token, id, userLikeId);
    } else {
      // Create a new like
      createPostLike(token, id);
    }
  };

  useEffect(() => {
    const userLike = postLikes.find((like) => like.user._id === user._id);
    if (userLike) {
      setIsLike(true);
      setUserLikeId(userLike._id);
    } else {
      setIsLike(false);
      setUserLikeId(null);
    }
  }, [postLikes]);

  return (
    <div
      key={post._id}
      id={id}
      className="bg-white w-1/2 rounded py-4 px-4 mb-4 shadow"
    >
      <PostHeader
        post={post}
        togglePostMenu={togglePostMenu}
        openPostEditModal={openPostEditModal}
        openPostDeleteModal={openPostDeleteModal}
        menuRef={menuRef}
        isPostMenuOpen={isPostMenuOpen}
      />
      <PostContent post={post} />
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
          onClick={handleLikeButtonClick}
          className="text-gray-500 font-medium hover:bg-gray-100 py-2 rounded w-1/2 flex items-center justify-center gap-x-2"
        >
          <MaterialIcon
            className={`material-symbols-outlined text-xl ${
              isLike ? "text-purple-600" : "text-gray-500"
            }`}
            iconName={"thumb_up"}
          />

          <div
            className={
              isLike
                ? "text-purple-600" // Purple when user has liked the post
                : "text-gray-500" // Default color when user hasn't liked the post
            }
          >
            Like
          </div>
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
      <AddComment
        postId={id}
        token={token}
        setIsCommentShow={setIsCommentShow}
      />
    </div>
  );
};

export default Post;
