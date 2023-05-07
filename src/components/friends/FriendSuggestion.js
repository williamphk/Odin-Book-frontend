import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { sendFriendRequest } from "../../api";
import { incrementSendCount } from "../../slices/friendRequestSlice";

const FriendSuggestion = ({ suggestion, isSent }) => {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const handleAddFriendClick = async (receiverId) => {
    try {
      await sendFriendRequest(token, receiverId);
      dispatch(incrementSendCount());
    } catch (error) {
      console.error("Error in handleAddFriendClick:", error);
    }
  };

  return (
    <div className="shadow-sm flex flex-col bg-white rounded-lg w-[220px] pb-3 items-center justify-center">
      <img
        src={suggestion.profile.picture}
        alt="Profile"
        className="h-[230px] w-full rounded-t-lg bg-purple-200"
      />
      <div className="my-2">{suggestion.profile.fullName}</div>
      <button
        onClick={() => handleAddFriendClick(suggestion._id)}
        className={`${
          isSent ? "bg-blue-500" : "bg-purple-500"
        } hover:bg-purple-600 rounded-lg p-2 w-[200px] h-[35px] text-white disabled:bg-gray-200 disabled:text-gray-500 relative overflow-hidden
        ${
          isSent ? "before:content-['Sent']" : "before:content-['Add_Friend']"
        } before:absolute  before:top-[5px] before:flex before:justify-center before:items-center
        after:content-['AFTER'] after:absolute after:top-[50px] after:flex after:justify-center after:items-center`}
        disabled={isSent}
      >
        {/* {isSent ? "Sent" : "Add Friend"} */}
      </button>
    </div>
  );
};

export default FriendSuggestion;
