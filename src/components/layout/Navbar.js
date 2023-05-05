import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

import MenuModal from "../common/MenuModal";
import PostModal from "../posts/PostModal";
import MaterialIcon from "../common/MaterialIcon";
import { createPost } from "../../api";
import { incrementCreateOrUpdateCount } from "../../slices/postSlice";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const onSubmit = (data) => {
    createPost(data, token);
    closePostModal();
    dispatch(incrementCreateOrUpdateCount());
  };

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

  const menuItems = [
    {
      name: "Profile",
      isLink: true,
    },
    {
      name: "Setting",
      isLink: true,
    },
    {
      name: "Logout",
      isLink: false,
      onClick: handleLogout,
    },
  ];

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const openPostModal = () => {
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  return (
    <header>
      <nav className="bg-purple-600 px-4 py-1">
        <div className="grid grid-cols-3">
          <h1 className="flex justify-start self-center text-white font-bold text-3xl">
            <Link to="/">Odin-book</Link>
          </h1>

          <div className="flex justify-center gap-x-32">
            {navItems.map((element, index) => {
              return index === navItems.length - 1 ? (
                <button
                  className="text-white flex flex-col items-center text-sm"
                  key={index}
                  onClick={openPostModal}
                >
                  {navIcons[index]}
                  <div>{element}</div>
                </button>
              ) : (
                <button
                  className="text-white flex flex-col items-center"
                  key={index}
                >
                  <Link to={navRoutes[element]} className="text-white text-sm">
                    {navIcons[index]}
                    {element}
                  </Link>
                </button>
              );
            })}
          </div>

          <div className="relative flex justify-end self-center">
            <button onClick={toggleProfileMenu} ref={menuRef}>
              <img
                src="https://via.placeholder.com/32"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </button>
            {isMenuOpen && <MenuModal menuItems={menuItems} />}
          </div>
        </div>
        {isPostModalOpen && (
          <PostModal
            title="Add a new post"
            placeholder={`What's on your mind, ${user.firstName}?`}
            closePostModal={closePostModal}
            requiredInputField={true}
            button="Post"
            onSubmit={onSubmit}
          />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
