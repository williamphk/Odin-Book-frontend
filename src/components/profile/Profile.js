import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getUser, getUserPost, getFriendList } from "../../api";
import Loading from "../common/Loading";
import Post from "../posts/Post";
import Intro from "./Intro";
import Friends from "./Friends";
import Heading from "./Heading";
import Nav from "./Nav";
import SkeletonPost from "../posts/SkeletonPost";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostsLoading, setIsPostsLoading] = useState(true);

  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const updatePictureCount = useSelector(
    (state) => state.profile.updatePictureCount
  );
  const acceptOrDeleteCount = useSelector(
    (state) => state.friendRequest.acceptOrDeleteCount
  );

  const { userId } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const fetchedProfile = await getUser(token, userId ?? user._id);
        setProfile(fetchedProfile.data.user.profile);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [token, userId, user._id, updatePictureCount]);

  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const fetchedPosts = await getUserPost(token, userId ?? user._id);
        setPosts(fetchedPosts.data.posts);
        setIsLoading(false);
        if (fetchedPosts.data.posts.length === 0) {
          setIsPostsLoading(false);
        }
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchUserPost();
  }, [token, userId, user._id, updatePictureCount]);

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const fetchedFriends = await getFriendList(token, userId ?? user._id);
        setFriends(fetchedFriends.data.friends);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchFriend();
  }, [token, userId, user._id, acceptOrDeleteCount]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col w-full lg:text-left">
      <Heading
        user={user}
        userId={userId}
        profile={profile}
        friends={friends}
      />
      <Nav />
      <div className="flex flex-col md:flex-row gap-x-4 md:px-[5%] lg:px-[15%] pt-4 gap-4">
        <div className="md:w-[43%] w-full flex flex-col gap-4">
          <Intro user={user} userId={userId} />
          <Friends friends={friends} />
        </div>
        <div className="md:w-[57%] w-full">
          <div className="w-full bg-white rounded-lg shadow p-3 font-bold text-lg mb-4">
            Posts
          </div>
          {isPostsLoading ? (
            <div>
              {Array(5)
                .fill()
                .map((element, index) => (
                  <SkeletonPost key={index} />
                ))}
            </div>
          ) : null}
          <div className={`${isPostsLoading && "hidden"}`}>
            {posts.length === 0 ? (
              <div className="text-center text-gray-500 font-bold text-lg">
                No posts available
              </div>
            ) : (
              posts.map((post) => (
                <Post
                  post={post}
                  key={post._id}
                  id={post._id}
                  token={token}
                  user={user}
                  setIsLoading={setIsPostsLoading}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
