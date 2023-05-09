import React from "react";
import { useSelector } from "react-redux";

const RightSidebar = ({ friends, className }) => {
  const friendsSwitch = useSelector((state) => state.page.friends);
  const profile = useSelector((state) => state.page.profile);
  const setting = useSelector((state) => state.page.setting);

  if (friendsSwitch || profile || setting) {
    return;
  }

  return (
    <div className={className}>
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
