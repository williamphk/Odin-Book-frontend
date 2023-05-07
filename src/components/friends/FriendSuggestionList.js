import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getFriendSuggestion, getFriendRequestsSent } from "../../api";
import FriendSuggestion from "./FriendSuggestion";
import Loading from "../common/Loading";

const FriendSuggestionList = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const sendCount = useSelector((state) => state.friendRequest.sendCount);

  const [friendSuggestion, setFriendSuggestion] = useState([]);
  const [friendRequestSent, setFriendRequestSent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendRequest = async () => {
      try {
        const fetchedFriendSuggestion = await getFriendSuggestion(
          token,
          user._id
        );
        setFriendSuggestion(fetchedFriendSuggestion.data.friendSuggestion);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchFriendRequest();
  }, [token, sendCount]);

  console.log(friendSuggestion);

  useEffect(() => {
    const fetchedFriendRequestSent = async () => {
      try {
        const fetchedFriendRequest = await getFriendRequestsSent(token);
        setFriendRequestSent(fetchedFriendRequest.data.friendRequests);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchedFriendRequestSent();
  }, [token, sendCount]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {friendSuggestion.map((suggestion) => (
        <FriendSuggestion
          suggestion={suggestion}
          key={suggestion._id}
          isSent={friendRequestSent.some(
            (friendRequest) =>
              friendRequest.sender === user._id &&
              friendRequest.receiver === suggestion._id
          )}
        />
      ))}
    </div>
  );
};

export default FriendSuggestionList;
