import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { switchToProfile } from "../../slices/pageSlice";

const UserName = ({ name, id, className }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(switchToProfile());
  };
  return (
    <button onClick={handleOnClick}>
      <Link className="w-full" to={"/profile/" + id}>
        <p className={className}>{name}</p>
      </Link>
    </button>
  );
};

export default UserName;
