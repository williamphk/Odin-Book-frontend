import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftSidebar = ({ className }) => {
  const friends = useSelector((state) => state.page.friends);

  return (
    <div className={className}>
      <div className="flex items-center mb-4">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <span className="ml-2 font-bold">Your Name</span>
      </div>
      <nav>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <button className="text-gray-600">Home</button>
          </li>
          <li className="flex flex-col items-start space-x-2">
            <button className="text-gray-600">Friends</button>
            {friends && (
              <ul className="flex flex-col items-start">
                <li>
                  <Link to="friends/">Friend requests</Link>
                </li>
                <li>
                  <Link to="friends/suggestions">Friend suggestions</Link>
                </li>
                <li>All firends</li>
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
