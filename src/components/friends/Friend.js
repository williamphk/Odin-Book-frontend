import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteFriend } from "../../api";
import { incrementDeleteCount } from "../../slices/userSlice";

const Friend = ({ friend }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleDeleteButton = async () => {
    await deleteFriend(token, user._id, friend.user);
    dispatch(incrementDeleteCount());
  };

  return (
    <div className="shadow-sm flex flex-col bg-white rounded-lg w-[220px] pb-3 items-center justify-center">
      <img
        src={friend.picture}
        alt="Profile"
        className="h-[230px] w-full rounded-t-lg bg-purple-200"
      />
      <div className="my-2">{friend.fullName}</div>
      <button
        onClick={handleDeleteButton}
        className="bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 rounded-lg p-2 w-[200px] h-[35px] overflow-hidden flex justify-center items-center transition duration-200"
      >
        Delete
      </button>
    </div>
  );
};

export default Friend;
