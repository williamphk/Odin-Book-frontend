import React from "react";
import { useSelector } from "react-redux";

import MaterialIcon from "../common/MaterialIcon";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const handleProfilePicClick = () => {};

  return (
    <div className="flex flex-col w-full text-left">
      <div className="flex justify-between w-full bg-white mt-48 relative h-48 pr-60">
        <div className="flex items-center">
          <div className="absolute bottom-12 left-60">
            <div className="flex relative">
              <button onClick={handleProfilePicClick}>
                <img
                  src={user.picture}
                  alt="Profile"
                  className="object-cover w-48 h-48 rounded-full border-4 border-white"
                />
              </button>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center absolute right-3 bottom-3">
                <MaterialIcon
                  className="material-symbols-outlined text-xl text-black"
                  iconName={"photo_camera"}
                />
              </div>
            </div>
          </div>
          <div className="pl-[450px]">
            <h2 className="flex text-3xl font-medium">{user.fullName}</h2>
            <div>1 friend</div>
          </div>
        </div>
        <div className="flex items-center">
          <button className="bg-gray-200 px-4 py-2 rounded">
            Edit profile
          </button>
        </div>
      </div>
      <div className="flex w-full bg-white relative h-12 px-60">
        <div className="border-t flex w-full">
          <button className="bg-gray-200 px-4 py-2">Home</button>
          <button className="px-4 py-2">Friends</button>
        </div>
      </div>
      <div className="flex px-32 gap-x-4 px-60 pt-6">
        <div className="w-[40%] bg-white rounded shadow">
          <div>Intro</div>
          <div>Friends</div>
        </div>
        <div className="w-[60%] bg-white rounded shadow">Posts</div>
      </div>
    </div>
  );
};

export default Profile;
