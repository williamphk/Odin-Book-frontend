import React from "react";

const RightSidebar = ({ friends }) => {
  return (
    <div className="bg-gray-100 w-1/2 p-4">
      <h3 className="font-bold text-lg mb-4">Friends</h3>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id} className="flex items-center mb-2">
            <img
              src={friend.profilePicture}
              alt={friend.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-2">
              <p className="font-semibold">{friend.name}</p>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightSidebar;
