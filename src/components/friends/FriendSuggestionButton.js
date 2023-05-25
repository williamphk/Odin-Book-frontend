import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { sendFriendRequest, deleteFriendRequest } from "../../api";
import { incrementSendCount } from "../../slices/friendRequestSlice";

const FriendSuggestionButton = ({ suggestionId, isSent, friendRequestId }) => {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const handleAddFriendClick = async (receiverId) => {
    try {
      if (!isSent) {
        await sendFriendRequest(token, receiverId);
      } else {
        await deleteFriendRequest(token, friendRequestId);
      }
      dispatch(incrementSendCount());
    } catch (error) {
      console.error("Error in handleAddFriendClick:", error);
    }
  };

  return (
    <button
      onClick={() => handleAddFriendClick(suggestionId)}
      className={`${
        isSent
          ? " bg-gray-200 text-gray-500"
          : "bg-purple-500 hover:bg-purple-600 text-white transition duration-200"
      } rounded-lg p-2 w-[200px] h-[35px] relative overflow-hidden
        ${
          isSent ? "before:content-['Sent']" : "before:content-['Add_Friend']"
        } before:absolute before:top-[0px] before:left-[0px] before:flex before:justify-center before:items-center before:w-full before:h-full before:transition-all
        ${
          isSent &&
          `after:content-['Remove_Request'] after:absolute after:top-[50px] after:left-[0px] after:flex after:justify-center after:items-center after:w-full after:h-full after:transition-all
        hover:before:top-[-50px] hover:after:top-[0px] hover:after:bg-red-500 hover:after:text-white`
        }`}
    ></button>
  );
};

export default FriendSuggestionButton;