import React from "react";

import ProfilePic from "../common/ProfilePic";
import UserName from "../common/UserName";
import FriendSuggestionButton from "./FriendSuggestionButton";

const FriendSuggestion = ({ suggestion, isSent, friendRequestId }) => {
  return (
    <div className="shadow-sm flex flex-col bg-white rounded-lg w-[220px] pb-3 items-center justify-center">
      <div className="flex flex-col w-full h-[230px] overflow-hidden">
        <ProfilePic
          picture={suggestion.profile.picture}
          id={suggestion._id}
          className="w-full rounded-t-lg"
        />
      </div>
      <div className="flex flex-col w-full">
        <UserName
          name={suggestion.profile.fullName}
          id={suggestion._id}
          className="my-2 hover:underline"
        />
      </div>
      <FriendSuggestionButton
        suggestionId={suggestion._id}
        isSent={isSent}
        friendRequestId={friendRequestId}
      />
    </div>
  );
};

export default FriendSuggestion;
