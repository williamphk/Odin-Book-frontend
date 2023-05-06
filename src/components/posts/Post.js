import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostAction from "./PostAction";
import { getCommentList } from "../../api";
import CommentList from "../comments/CommentList";
import AddComment from "../comments/AddComment";

const Post = ({ post, id }) => {
  const [isCommentShow, setIsCommentShow] = useState(false);
  const [comments, setComments] = useState([]);

  const token = useSelector((state) => state.auth.token);

  const createOrUpdateCount = useSelector(
    (state) => state.comment.createOrUpdateCount
  );

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

  return (
    <div
      key={post._id}
      id={id}
      className="bg-white w-full rounded py-4 px-4 mb-4 shadow"
    >
      <PostHeader post={post} postId={id} />
      <PostContent post={post} />
      <PostAction
        handleCommentShow={handleCommentShow}
        comments={comments}
        postId={id}
      />
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
