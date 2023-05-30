import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { switchComponent } from "../../slices/pageSlice";

const ProfilePic = ({ picture, id, className }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(switchComponent("profile"));
  };

  return (
    <button onClick={handleOnClick}>
      <Link className="w-full" to={"/profile/" + id}>
        <img
          src={`${
            picture === "default"
              ? "http://localhost:3000/images/default.jpg"
              : "http://localhost:3000/uploads/" + picture
          }`}
          alt="Profile"
          className={className}
        />
      </Link>
    </button>
  );
};

export default ProfilePic;
