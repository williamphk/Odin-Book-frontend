import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import MaterialIcon from "../common/MaterialIcon";
import { getUser, getUserPost, getFriendList } from "../../api";
import Loading from "../common/Loading";
import Post from "../posts/Post";
import ProfilePic from "../common/ProfilePic";
import UserName from "../common/UserName";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);

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
      <div className="flex flex-col items-center lg:flex-row lg:justify-between w-full bg-white lg:mt-48 mt-32 relative h-48 lg:pr-60 pt-24 lg:pt-0 pb-32">
        <div className="flex items-center flex-col lg:flex-row">
          <div className="absolute lg:bottom-12 lg:left-60 bottom-36">
            <div className="flex relative">
              <img
                src={profile.picture}
                alt="Profile"
                className="object-cover md:w-48 md:h-48 w-44 h-44 rounded-full border-4 border-white"
              />
              {(!userId || userId === user._id) && (
                <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center absolute right-3 bottom-3">
                  <MaterialIcon
                    className="material-symbols-outlined text-xl text-black"
                    iconName={"photo_camera"}
                  />
                </button>
              )}
            </div>
          </div>
          <div className="lg:pl-[450px]">
            <h2 className="flex text-3xl font-medium">{profile.fullName}</h2>
            <div className="text-gray-500">1 friend</div>
          </div>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          {(!userId || userId === user._id) && (
            <button className="bg-gray-200 px-4 py-2 rounded-lg">
              Edit profile
            </button>
          )}
        </div>
      </div>
      <div className="flex w-full bg-white relative h-12 md:px-[5%] lg:px-[15%] shadow">
        <div className="border-t flex w-full justify-center md:justify-start">
          <button className="bg-gray-200 px-4 py-2">Home</button>
          <button className="px-4 py-2">Friends</button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-4 md:px-[5%] lg:px-[15%] pt-4 gap-4">
        <div className="md:w-[43%] w-full flex flex-col gap-4">
          <div className="w-full bg-white rounded-lg shadow p-3 flex flex-col gap-y-4">
            <div className="font-bold">Intro</div>
            {(!userId || userId === user._id) && (
              <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
                <button className="w-full">Add work</button>
              </div>
            )}
            {(!userId || userId === user._id) && (
              <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
                <button className="w-full">Add eduation</button>
              </div>
            )}
            {(!userId || userId === user._id) && (
              <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
                <button className="w-full">Add current city</button>
              </div>
            )}
            {(!userId || userId === user._id) && (
              <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
                <button className="w-full">Edit details</button>
              </div>
            )}
          </div>
          <div className="w-full bg-white rounded-lg shadow p-3 flex flex-col">
            <div className="font-bold">Friends</div>
            <div className="text-gray-500">{friends.length} friends</div>
            <div className="flex gap-x-2 mt-3">
              {friends.map((friend) => (
                <div className="flex flex-col">
                  <ProfilePic
                    picture={friend.picture}
                    id={friend.user._id}
                    className="object-cover w-28 h-28 rounded-lg ring-1 ring-gray-100"
                  />
                  <UserName
                    name={friend.fullName}
                    id={friend.user._id}
                    className="text-sm text-left"
                  />
                </div>
              ))}
            </div>
          </div>
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
