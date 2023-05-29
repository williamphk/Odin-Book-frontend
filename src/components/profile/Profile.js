import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Heading from "./Heading";
import Nav from "./Nav";
import Home from "./Home";

import { getUser } from "../../api";

import FriendList from "../friends/FriendList";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const updatePictureCount = useSelector(
    (state) => state.profile.updatePictureCount
  );

  let { userId } = useParams();
  const location = useLocation();

  const currentPath = location.pathname;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const fetchedProfile = await getUser(
          token,
          userId === "friends" ? (userId = user._id) : userId ?? user._id
        );
        setProfile(fetchedProfile.data.user.profile);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [token, userId, user._id, updatePictureCount]);

  return (
    <div className="flex flex-col w-full lg:text-left">
      <Heading
        user={user}
        userId={user._id}
        profile={profile}
        friends={friends}
      />
      <Nav />
      {userId === "friends" ||
      (userId !== "friends" && currentPath.includes("/friends")) ? (
        <div className="flex flex-col md:flex-row gap-x-4 md:px-[5%] lg:px-[15%] pt-4 gap-4">
          <FriendList
            userId={
              userId === "friends" ? (userId = user._id) : userId ?? user._id
            }
          />
        </div>
      ) : (
        <Home
          user={user}
          setProfile={setProfile}
          friends={friends}
          setFriends={setFriends}
        />
      )}
    </div>
  );
};

export default Profile;
