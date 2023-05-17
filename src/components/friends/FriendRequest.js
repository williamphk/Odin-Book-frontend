import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { acceptFriendRequest, rejectFriendRequest } from "../../api";
import { incrementAcceptOrDeleteCount } from "../../slices/friendRequestSlice";

const FriendRequest = ({ friendRequest }) => {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const handleAcceptButton = async () => {
    await acceptFriendRequest(token, friendRequest._id);
    dispatch(incrementAcceptOrDeleteCount());
  };

  const handleDeleteButton = async () => {
    await rejectFriendRequest(token, friendRequest._id);
    dispatch(incrementAcceptOrDeleteCount());
  };

  return (
    <div className="shadow-sm flex flex-col bg-white rounded-lg w-[220px] pb-3 items-center justify-center">
      <img
        src={friendRequest.sender.profile.picture}
        alt="Profile"
        className="h-[230px] w-full rounded-t-lg bg-purple-200"
      />
      <div className="my-2">{friendRequest.sender.profile.fullName}</div>
      <button
        onClick={handleAcceptButton}
        className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-2 w-[200px] h-[35px] overflow-hidden flex justify-center items-center mb-2 transition duration-200"
      >
        Confirm
      </button>
      <button
        onClick={handleDeleteButton}
        className="bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 rounded-lg p-2 w-[200px] h-[35px] overflow-hidden flex justify-center items-center transition duration-200"
      >
        Delete
      </button>
    </div>
  );
};

export default FriendRequest;
