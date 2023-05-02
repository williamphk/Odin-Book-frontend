import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

import AddPost from "./AddPost";
import MaterialIcon from "./MaterialIcon";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  // Reference the profile menu DOM element.
  const menuRef = useRef(null);

  const toggleProfileMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

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

  const navItems = ["Home", "Friends", "Post"];
  const navRoutes = {
    Home: "/",
    Friends: "/friends",
  };
  const navIconArray = ["home", "group", "post_add"];
  const navIcons = navIconArray.map((iconName) => (
    <MaterialIcon
      className="material-symbols-outlined text-4xl"
      iconName={iconName}
    />
  ));
  const menuItems = ["Profile", "Setting", "Logout"];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-purple-600 px-4 py-2">
      <div className="grid grid-cols-3">
        <div className="flex justify-start self-center text-white font-bold text-3xl">
          <Link to="/">Odin-book</Link>
        </div>

        <div className="flex justify-center gap-x-32">
          {navItems.map((element, index) => {
            return index === navItems.length - 1 ? (
              <button
                className="text-white flex flex-col items-center text-sm"
                key={index}
                onClick={openModal}
              >
                {navIcons[index]}
                {element}
              </button>
            ) : (
              <button
                className="text-white flex flex-col items-center"
                key={index}
              >
                {navIcons[index]}
                <Link to={navRoutes[element]} className="text-white text-sm">
                  {element}
                </Link>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end self-center">
          <button onClick={toggleProfileMenu} ref={menuRef}>
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </button>

          {isMenuOpen && (
            <div className="absolute top-[53px] right-3 mt-2 w-36 bg-white rounded-md shadow-lg py-1 text-gray-700">
              {menuItems.map((element, index) => {
                return index === menuItems.length - 1 ? (
                  <button
                    type="button"
                    key={index}
                    onClick={handleLogout}
                    className="w-full block px-4 py-2 hover:bg-purple-600 hover:text-white"
                  >
                    {element}
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={"/" + element}
                    className="block px-4 py-2 hover:bg-purple-600 hover:text-white"
                  >
                    {element}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <AddPost isOpen={isModalOpen} closeModal={closeModal} />
    </nav>
  );
};

export default Navbar;
