import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MaterialIcon from "../common/MaterialIcon";
import PostModal from "../posts/PostModal";
import ProfilePic from "../common/ProfilePic";
import FriendButton from "../friends/FriendButton";
import FriendSuggestionButton from "../friends/FriendSuggestionButton";

import {
  updateProfilePic,
  getFriendList,
  getFriendRequestsSent,
} from "../../api";
import { incrementUpdatePictureCount } from "../../slices/profileSlice";
import { updateUser } from "../../slices/authSlice";

const Heading = ({ user, userId, profile, friends }) => {
  const [isProfilePicModalOpen, setIsProfilePicModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userFriends, setUserFriends] = useState([]);
  const [friendRequestSent, setFriendRequestSent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const acceptOrDeleteCount = useSelector(
    (state) => state.friendRequest.acceptOrDeleteCount
  );
  const sendCount = useSelector((state) => state.friendRequest.sendCount);

  const dispatch = useDispatch();

  const handleCameraButtonClick = () => {
    setIsProfilePicModalOpen(true);
  };

  const closeProfilePicModal = () => {
    setIsProfilePicModalOpen(false);
  };

  const onSubmit = async () => {
    if (selectedFile) {
      const response = await updateProfilePic(
        token,
        userId ?? user._id,
        selectedFile
      );
      closeProfilePicModal();
      const updatedUser = { ...user, picture: response.data.picture };
      dispatch(updateUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch(incrementUpdatePictureCount());
      console.log(response);
    }
  };

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const fetchedFriends = await getFriendList(token, user._id);
        setUserFriends(fetchedFriends.data.friends);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchFriend();
  }, [token, acceptOrDeleteCount, user._id]);

  const isOwnProfile = !userId || userId === user._id;
  const isFriend = userFriends.some((element) => element.user._id === userId);

  useEffect(() => {
    const fetchedFriendRequestSent = async () => {
      try {
        const fetchedFriendRequest = await getFriendRequestsSent(token);
        setFriendRequestSent(fetchedFriendRequest.data.friendRequests);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchedFriendRequestSent();
  }, [token, sendCount]);

  const matchingFriendRequest = (suggestionId) => {
    return friendRequestSent.find(
      (friendRequest) =>
        friendRequest.sender === user._id &&
        friendRequest.receiver === suggestionId
    );
  };

  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-between w-full bg-white lg:mt-48 mt-32 relative h-48 lg:pr-60 pt-24 lg:pt-0 pb-32 lg:pb-0">
      <div className="flex items-center flex-col lg:flex-row">
        <div className="absolute lg:bottom-12 lg:left-60 bottom-36">
          <div className="flex relative">
            <ProfilePic
              picture={profile.picture}
              id={userId || user._id}
              className="object-cover md:w-48 md:h-48 w-44 h-44 rounded-full border-4 border-white"
            />
            {(!userId || userId === user._id) && (
              <button
                onClick={handleCameraButtonClick}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center absolute right-3 bottom-3"
              >
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
          <div className="text-gray-500"> {friends.length} friends</div>
        </div>
      </div>
      <div className="flex items-center mt-2 md:mt-0">
        {isOwnProfile ? (
          <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
            Edit profile
          </button>
        ) : isFriend ? (
          <FriendButton friendId={userId} />
        ) : (
          <FriendSuggestionButton
            suggestionId={userId}
            isSent={!!matchingFriendRequest(userId)}
            friendRequestId={matchingFriendRequest(userId)?._id}
          />
        )}
      </div>
      {isProfilePicModalOpen && (
        <PostModal
          title="Update Profile Picture"
          closePostModal={closeProfilePicModal}
          requiredFileUpload={true}
          button="Confirm"
          buttonColor="bg-purple-500"
          buttonHoverColor="bg-purple-600"
          setSelectedFile={setSelectedFile}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

//api
export default Heading;