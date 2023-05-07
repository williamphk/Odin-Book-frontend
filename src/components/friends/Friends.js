import React from "react";
import { Route, Routes } from "react-router-dom";
import FriendSuggestionList from "./FriendSuggestionList";

import FriendRequestList from "./FriendRequestList";

const Friends = () => {
  return (
    <div className="container flex flex-col w-3/4">
      <Routes>
        <Route path="/suggestion" element={<FriendSuggestionList />} />
        <Route path="/" element={<FriendRequestList />} />
      </Routes>
    </div>
  );
};

export default Friends;
