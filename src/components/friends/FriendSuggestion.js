import React from "react";
import { useSelector } from "react-redux";

import { sendFriendRequest } from "../../api";

const FriendSuggestion = ({ suggestion }) => {
  const token = useSelector((state) => state.auth.token);

  const handleAddFriendClick = async (receiverId) => {
    try {
      await sendFriendRequest(token, receiverId);
    } catch (error) {
      console.error("Error in handleAddFriendClick:", error);
    }
  };

  return (
    <div className="shadow-sm flex flex-col bg-white rounded-lg min-w-[200px] max-w-[250px] pb-3 items-center justify-center grow">
      <img
        src={suggestion.profile.picture}
        alt="Profile"
        className="h-[230px] w-full rounded-t-lg bg-purple-200"
      />
      <div className="my-2">{suggestion.profile.fullName}</div>
      <button
        onClick={() => handleAddFriendClick(suggestion._id)}
        className="bg-purple-500 hover:bg-purple-600 rounded-lg p-2 w-[80%] text-white"
      >
        Add Friend
      </button>
    </div>
  );
};

export default FriendSuggestion;
