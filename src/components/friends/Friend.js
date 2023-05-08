import React from "react";

const Friend = ({ friend }) => {
  return (
    <div className="shadow-sm flex flex-col bg-white rounded-lg w-[220px] pb-3 items-center justify-center">
      <img
        src={friend.picture}
        alt="Profile"
        className="h-[230px] w-full rounded-t-lg bg-purple-200"
      />
      <div className="my-2">{friend.fullName}</div>
    </div>
  );
};

export default Friend;
