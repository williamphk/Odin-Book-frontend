import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Friend from "./Friend";
import Loading from "../common/Loading";
import { getFriendList } from "../../api";

const FriendList = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const acceptOrDeleteCount = useSelector(
    (state) => state.friendRequest.acceptOrDeleteCount
  );

  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const fetchedFriends = await getFriendList(token, user._id);
        setFriends(fetchedFriends.data.friends);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchFriend();
  }, [token, acceptOrDeleteCount, user._id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="flex text-xl font-medium">All friends</h2>
      <div className="flex flex-wrap gap-3">
        {friends.length === 0 ? (
          <div>No friends yet</div>
        ) : (
          friends.map((friend) => <Friend friend={friend} key={friend._id} />)
        )}
      </div>
    </div>
  );
};

export default FriendList;
