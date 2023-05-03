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

  console.log(posts);

  function formatDate(date) {
    const inputDate = new Date(date);
    return inputDate.toLocaleDateString("en-US");
  }

  const renderPosts = () => {
    return posts.data.posts.map((post) => (
      <div key={post._id} className="bg-white w-1/2 rounded p-4 mb-4 shadow">
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
        <div className="flex justify-start py-2 break-all">
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
    ));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="">News Feed</h1>
      <div className="container flex flex-col items-center">
        {renderPosts()}
      </div>
    </div>
  );
};

export default NewsFeed;
