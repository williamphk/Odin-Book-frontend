import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getNewsFeed } from "../../api";
import Post from "./Post";
import SkeletonPost from "./SkeletonPost";

const NewsFeed = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const createOrUpdateCount = useSelector(
    (state) => state.post.createOrUpdateCount
  );
  const [posts, setPosts] = useState([]);
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
    return (
      <div className="container flex flex-col max-w-[660px] py-3 sm:pr-3">
        {Array(5)
          .fill()
          .map((element, index) => (
            <SkeletonPost key={index} />
          ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container flex flex-col max-w-[660px] py-3 sm:pr-3">
      {posts.map((post) => (
        <Post
          post={post}
          key={post._id}
          id={post._id}
          token={token}
          user={user}
        />
      ))}
    </div>
  );
};

export default NewsFeed;
