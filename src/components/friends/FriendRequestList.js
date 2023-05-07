import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import FriendRequest from "./FriendRequest";
import Loading from "../common/Loading";
import { getFriendRequestsReceived } from "../../api";

const FriendRequestList = () => {
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
        const fetchedFriendRequests = await getFriendRequestsReceived(token);
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
    <div>
      {friendRequests.map((friendRequest) => {
        <FriendRequest
          friendRequests={friendRequests}
          key={friendRequest._id}
          id={friendRequest._id}
        />;
      })}
    </div>
  );
};

export default FriendRequestList;
