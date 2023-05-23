import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MaterialIcon from "../common/MaterialIcon";
import PostModal from "../posts/PostModal";

import { updateProfilePic } from "../../api";
import { incrementUpdatePictureCount } from "../../slices/profileSlice";

const Heading = ({ user, userId, profile, friends }) => {
  const [isProfilePicModalOpen, setIsProfilePicModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const handleCameraButtonClick = () => {
    setIsProfilePicModalOpen(true);
  };

  const closeProfilePicModal = () => {
    setIsProfilePicModalOpen(false);
  };

  const onSubmit = async () => {
    if (selectedFile) {
      await updateProfilePic(token, userId ?? user._id, selectedFile);
      closeProfilePicModal();
      dispatch(incrementUpdatePictureCount());
    }
  };

  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-between w-full bg-white lg:mt-48 mt-32 relative h-48 lg:pr-60 pt-24 lg:pt-0 pb-32 lg:pb-0">
      <div className="flex items-center flex-col lg:flex-row">
        <div className="absolute lg:bottom-12 lg:left-60 bottom-36">
          <div className="flex relative">
            <img
              src={profile.picture}
              alt="Profile"
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
        {(!userId || userId === user._id) && (
          <button className="bg-gray-200 px-4 py-2 rounded-lg">
            Edit profile
          </button>
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
