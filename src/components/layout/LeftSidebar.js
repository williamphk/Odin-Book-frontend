import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { switchToFriends, switchToNewfeed } from "../../slices/pageSlice";

const LeftSidebar = ({ className }) => {
  const user = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.page.friends);

  const dispatch = useDispatch();

  return (
    <div className={className}>
      <div className="flex items-center mb-4">
        <img
          src={user.picture}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <span className="ml-2 font-bold">{user.fullName}</span>
      </div>
      <nav>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <button
              className="text-gray-600"
              onClick={() => dispatch(switchToNewfeed())}
            >
              <Link to="/">Home</Link>
            </button>
          </li>
          <li className="flex flex-col items-start space-x-2">
            <button
              className="text-gray-600"
              onClick={() => dispatch(switchToFriends())}
            >
              <Link to="/friends">Friends</Link>
            </button>
            {friends && (
              <ul className="flex flex-col items-start">
                <li>
                  <Link to="/friends">Friend requests</Link>
                </li>
                <li>
                  <Link to="/friends/suggestion">Friend suggestions</Link>
                </li>
                <li>
                  <Link to="/friends/list">All friends</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="flex items-center space-x-2">
            <button className="text-gray-600">Ad Center</button>
          </li>
          <li className="flex items-center space-x-2">
            <button className="text-gray-600">Most Recent</button>
          </li>
          <li className="flex items-center space-x-2">
            <button className="text-gray-600">Groups</button>
          </li>
          <li className="flex items-center space-x-2">
            <button className="text-gray-600">Marketplace</button>
          </li>
          <li className="flex items-center space-x-2">
            <button className="text-gray-600">Watch</button>
          </li>
          <li className="flex items-center space-x-2">
            <button className="text-gray-600">See more</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftSidebar;
