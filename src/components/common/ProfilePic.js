import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { switchToProfile } from "../../slices/pageSlice";

const ProfilePic = ({ picture, id, className }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(switchToProfile());
  };

  return (
    <button onClick={handleOnClick}>
      <Link className="w-full" to={"/profile/" + id}>
        <img
          src={`http://localhost:3000/uploads/${picture}`}
          alt="Profile1"
          className={className}
        />
      </Link>
    </button>
  );
};

export default ProfilePic;
