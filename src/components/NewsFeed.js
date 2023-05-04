import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getNewsFeed } from "../api";
import Post from "./Post";
import Loading from "./Loading";

const NewsFeed = () => {
  const token = useSelector((state) => state.auth.token);
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsFeed = async () => {
      try {
        const fetchedPosts = await getNewsFeed(token);
        setPosts(fetchedPosts);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchNewsFeed();
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <div className="container flex flex-col items-center">
        {posts.data.posts.map((post) => (
          <Post post={post} key={post._id} id={post._id} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
