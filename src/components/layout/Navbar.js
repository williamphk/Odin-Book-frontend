import React from "react";

import SiteNameAndLogo from "./SiteNameAndLogo";
import NavButton from "./NavButton";
import ProfilePic from "./ProfilePic";

const Navbar = () => {
  return (
    <header className="sticky top-0 shadow-md bg-white z-10">
      <nav className="px-4">
        <div className="grid grid-cols-3">
          <SiteNameAndLogo />
          <NavButton />
          <ProfilePic />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
