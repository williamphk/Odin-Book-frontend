import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getUser, getUserPost, getFriendList } from "../../api";
import Loading from "../common/Loading";
import Post from "../posts/Post";
import Intro from "./Intro";
import Friends from "./Friends";
import Heading from "./Heading";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

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
  }, [token, userId, user._id]);

  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const fetchedPosts = await getUserPost(token, userId ?? user._id);
        setPosts(fetchedPosts.data.posts);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchUserPost();
  }, [token, userId, user._id]);

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
  }, [token, userId, user._id]);

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
      <div className="flex w-full bg-white relative h-12 md:px-[5%] lg:px-[15%] shadow">
        <div className="border-t flex w-full justify-center md:justify-start">
          <button className="bg-gray-200 px-4 py-2">Home</button>
          <button className="px-4 py-2">Friends</button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4 md:px-[5%] lg:px-[15%] pt-4 gap-4">
        <div className="md:w-[43%] w-full flex flex-col gap-4">
          <Intro user={user} userId={userId} />
          <Friends friends={friends} />
        </div>
        <div className="md:w-[57%] w-full">
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
      </div>
    </div>
  );
};

export default Profile;
