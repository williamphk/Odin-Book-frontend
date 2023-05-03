import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getNewsFeed } from "../api";

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

  const renderPosts = () => {
    return posts.data.posts.map((post) => (
      <div key={post._id} className="bg-white rounded p-4 mb-4 shadow">
        <h3 className="text-xl mb-2">{post.title}</h3>
        <p>{post.content}</p>
      </div>
    ));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-blue-100">
      <h1 className="flex justify-center">News Feed</h1>
      <div className="container mx-auto">{renderPosts()}</div>
    </div>
  );
};

export default NewsFeed;
