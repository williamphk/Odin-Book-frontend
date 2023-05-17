import React from "react";
import { Link } from "react-router-dom";

const ProfilePic = ({ picture, id, className }) => {
  const handleOnClick = () => {};

  return (
    <button onClick={handleOnClick}>
      <Link className="w-full" to={"/profile/" + id}>
        <img src={picture} alt="Profile" className={className} />
      </Link>
    </button>
  );
};

export default ProfilePic;
