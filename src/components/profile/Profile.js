import React from "react";
import { useSelector } from "react-redux";

import MaterialIcon from "../common/MaterialIcon";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const handleProfilePicClick = () => {};

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between w-full bg-white shadow">
        <div className="flex">
          <div>
            <button onClick={handleProfilePicClick}>
              <img
                src={user.picture}
                alt="Profile"
                className="w-32 h-32 rounded-full"
              />
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center">
              <MaterialIcon
                className="material-symbols-outlined text-xl text-black"
                iconName={"photo_camera"}
              />
            </div>
          </div>
          <div>
            <h2 className="flex text-xl font-medium">{user.fullName}</h2>
            <div>1 friend</div>
          </div>
        </div>
        <button>Edit profile</button>
      </div>
      <div className="flex">
        <div>Home</div>
        <div>Friends</div>
      </div>
      <div className="flex px-32 gap-x-4">
        <div className="w-1/2 bg-white rounded shadow">
          <div>Intro</div>
          <div>Friends</div>
        </div>
        <div className="w-1/2 bg-white rounded shadow">Posts</div>
      </div>
    </div>
  );
};

export default Profile;
