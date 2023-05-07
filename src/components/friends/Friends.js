import React from "react";
import { Route, Routes } from "react-router-dom";
import FriendSuggestionList from "./FriendSuggestionList";

import FriendRequestList from "./FriendRequestList";
import LeftSidebar from "../layout/LeftSidebar";

const Friends = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-3 px-0 lg:px-3 flex">
      <LeftSidebar className="flex-col bg-gray-100 w-1/4 hidden lg:flex" />
      <div className="container flex flex-col w-3/4">
        <Routes>
          <Route path="suggestion" element={<FriendSuggestionList />} />
          <Route path="/" element={<FriendRequestList />} />
        </Routes>
      </div>
    </div>
  );
};

export default Friends;
