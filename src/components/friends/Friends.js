import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import FriendSuggestionList from "./FriendSuggestionList";
import FriendRequestList from "./FriendRequestList";
import FriendList from "./FriendList";

const Friends = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex flex-col w-3/4 py-3 sm:pr-3">
      <Routes>
        <Route path="/suggestion" element={<FriendSuggestionList />} />
        <Route path="/list" element={<FriendList userId={user._id} />} />
        <Route path="/" element={<FriendRequestList />} />
      </Routes>
    </div>
  );
};

export default Friends;
