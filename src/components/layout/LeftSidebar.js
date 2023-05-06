// LeftSidebar.js
import React from "react";

const LeftSidebar = () => {
  return (
    <div className="flex flex-col bg-gray-100 p-4 w-1/2">
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
            <i className="text-xl"></i>
            <span className="text-gray-600">Home</span>
          </li>
          <li className="flex items-center space-x-2">
            <i className="text-xl"></i>
            <span className="text-gray-600">Friends</span>
          </li>
          <li className="flex items-center space-x-2">
            <i className="text-xl"></i>
            <span className="text-gray-600">Watch</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftSidebar;
