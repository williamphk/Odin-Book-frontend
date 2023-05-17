import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";

import MenuModal from "../common/MenuModal";
import {
  switchToNewfeed,
  switchToProfile,
  switchToSetting,
} from "../../slices/pageSlice";

const ProfilePicSection = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const [isMenuOpen, setMenuOpen] = useState(false);

  // Reference the profile menu DOM element.
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    // If the menu is mounted in the DOM and the clicked element is not one of the menu items
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      // When the Navbar component is unmounted, the event listener is removed
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(switchToNewfeed());
  };

  const toggleProfileMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    dispatch(switchToProfile());
  };

  const handleSettingClick = () => {
    dispatch(switchToSetting());
  };

  const menuItems = [
    {
      name: "profile",
      isLink: true,
      onClick: handleProfileClick,
    },
    {
      name: "setting",
      isLink: true,
      onClick: handleSettingClick,
    },
    {
      name: "Logout",
      isLink: false,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="relative flex justify-end self-center">
      <button onClick={toggleProfileMenu} ref={menuRef}>
        <img
          src={user.picture}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </button>
      {isMenuOpen && <MenuModal menuItems={menuItems} />}
    </div>
  );
};

export default ProfilePicSection;