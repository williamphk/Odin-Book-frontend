import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { switchToNewfeed } from "../../slices/pageSlice";

const SiteNameAndLogo = () => {
  const dispatch = useDispatch();

  const handleSiteNameAndLogoClick = () => {
    dispatch(switchToNewfeed());
  };

  return (
    <div className="self-center">
      <button
        onClick={handleSiteNameAndLogoClick}
        className="lg:flex justify-start text-purple-500 font-bold text-3xl hidden"
      >
        <Link to="/">
          <h1>Odin-book</h1>
        </Link>
      </button>
    </div>
  );
};

export default SiteNameAndLogo;
