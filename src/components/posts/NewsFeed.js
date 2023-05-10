import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getNewsFeed } from "../../api";
import Post from "./Post";
import Loading from "../common/Loading";

const NewsFeed = () => {
  const token = useSelector((state) => state.auth.token);
  const createOrUpdateCount = useSelector(
    (state) => state.post.createOrUpdateCount
  );
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsFeed = async () => {
      try {
        const fetchedPosts = await getNewsFeed(token);
        setPosts(fetchedPosts.data.posts);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchNewsFeed();
  }, [token, createOrUpdateCount]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container flex flex-col max-w-[660px] py-3 sm:pr-3">
      {posts.map((post) => (
        <Post post={post} key={post._id} id={post._id} />
      ))}
    </div>
  );
};

export default NewsFeed;
