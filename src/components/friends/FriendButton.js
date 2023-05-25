import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteFriend } from "../../api";
import { incrementDeleteCount } from "../../slices/userSlice";

const FriendButton = ({ friend }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleDeleteButton = async () => {
    await deleteFriend(token, user._id, friend.user);
    dispatch(incrementDeleteCount());
  };

  return (
    <button
      onClick={handleDeleteButton}
      className="bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 rounded-lg p-2 w-[200px] h-[35px] overflow-hidden flex justify-center items-center transition duration-200"
    >
      Delete
    </button>
  );
};

export default FriendButton;
