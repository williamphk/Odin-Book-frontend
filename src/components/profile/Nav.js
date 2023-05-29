import React from "react";
import { Link, useParams } from "react-router-dom";

const Nav = () => {
  let { userId } = useParams();
  return (
    <div className="flex w-full bg-white relative h-12 md:px-[5%] lg:px-[15%] shadow">
      <div className="border-t flex w-full justify-center md:justify-start">
        <button className="bg-gray-200 w-20 h-12">
          <Link
            className="block h-full w-full flex justify-center items-center"
            to={`${
              userId && userId !== "friends" ? "/profile/" + userId : "/profile"
            }`}
          >
            Home
          </Link>
        </button>
        <button className="w-20 h-12">
          <Link
            className="block h-full w-full flex justify-center items-center"
            to={`${
              userId && userId !== "friends"
                ? "/profile/" + userId + "/friends"
                : "/profile/friends"
            }`}
          >
            Friends
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Nav;
