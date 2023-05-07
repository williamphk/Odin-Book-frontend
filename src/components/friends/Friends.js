import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getFriendRequests } from "../../api";
import FriendRequest from "./FriendRequest";
import Loading from "../common/Loading";
import LeftSidebar from "../layout/LeftSidebar";

const Friends = () => {
  const token = useSelector((state) => state.auth.token);
  const acceptOrDeleteCount = useSelector(
    (state) => state.friendRequest.acceptOrDeleteCount
  );
  const [friendRequests, setFriendRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendRequest = async () => {
      try {
        const fetchedFriendRequests = await getFriendRequests(token);
        setFriendRequest(fetchedFriendRequests.data.friendRequests);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchFriendRequest();
  }, [token, acceptOrDeleteCount]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-3 px-0 lg:px-3 flex">
      <LeftSidebar className="flex-col bg-gray-100 w-1/2 hidden lg:flex" />
      <div className="container flex flex-col">
        {friendRequests.map((friendRequest) => {
          <FriendRequest
            friendRequests={friendRequests}
            key={friendRequest._id}
            id={friendRequest._id}
          />;
        })}
      </div>
    </div>
  );
};

export default Friends;
