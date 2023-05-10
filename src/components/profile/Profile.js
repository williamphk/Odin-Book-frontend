import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import MaterialIcon from "../common/MaterialIcon";
import { getUser, getUserPost } from "../../api";
import Loading from "../common/Loading";
import Post from "../posts/Post";

const Profile = () => {
  const [profile, setProfile] = useState({});
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
  }, [userId]);

  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const fetchedPosts = await getUserPost(token);
        setPosts(fetchedPosts.data.posts);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchUserPost();
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col w-full text-left">
      <div className="flex justify-between w-full bg-white mt-48 relative h-48 pr-60">
        <div className="flex items-center">
          <div className="absolute bottom-12 left-60">
            <div className="flex relative">
              <img
                src={profile.picture}
                alt="Profile"
                className="object-cover w-48 h-48 rounded-full border-4 border-white"
              />
              <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center absolute right-3 bottom-3">
                <MaterialIcon
                  className="material-symbols-outlined text-xl text-black"
                  iconName={"photo_camera"}
                />
              </button>
            </div>
          </div>
          <div className="pl-[450px]">
            <h2 className="flex text-3xl font-medium">{profile.fullName}</h2>
            <div className="text-gray-500">1 friend</div>
          </div>
        </div>
        <div className="flex items-center">
          {userId
            ? userId === user._id
            : user._id && (
                <button className="bg-gray-200 px-4 py-2 rounded">
                  Edit profile
                </button>
              )}
        </div>
      </div>
      <div className="flex w-full bg-white relative h-12 px-60">
        <div className="border-t flex w-full">
          <button className="bg-gray-200 px-4 py-2">Home</button>
          <button className="px-4 py-2">Friends</button>
        </div>
      </div>
      <div className="flex px-32 gap-x-4 px-60 pt-6">
        <div className="w-[40%]">
          <div className="w-full bg-white rounded shadow p-3 flex flex-col gap-y-4">
            <div>Intro</div>
            {userId
              ? userId === user._id
              : user._id && (
                  <div className="text-sm rounded bg-gray-200 hover:bg-gray-300 py-1">
                    <button className="w-full">Add work</button>
                  </div>
                )}
            {userId
              ? userId === user._id
              : user._id && (
                  <div className="text-sm rounded bg-gray-200 hover:bg-gray-300 py-1">
                    <button className="w-full">Add eduation</button>
                  </div>
                )}
            {userId
              ? userId === user._id
              : user._id && (
                  <div className="text-sm rounded bg-gray-200 hover:bg-gray-300 py-1">
                    <button className="w-full">Add current city</button>
                  </div>
                )}
            {userId
              ? userId === user._id
              : user._id && (
                  <div className="text-sm rounded bg-gray-200 hover:bg-gray-300 py-1">
                    <button className="w-full">Edit details</button>
                  </div>
                )}
          </div>
          <div>Friends</div>
        </div>
        <div className="w-[60%]">
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
