import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";

import MenuModal from "../common/MenuModal";
import PostModal from "../posts/PostModal";
import MaterialIcon from "../common/MaterialIcon";
import { createPost } from "../../api";
import { incrementCreateOrUpdateCount } from "../../slices/postSlice";
import { switchToFriends, switchToNewfeed } from "../../slices/pageSlice";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const newsfeed = useSelector((state) => state.page.newsfeed);
  const friends = useSelector((state) => state.page.friends);

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
  const navSelected = {
    Home: newsfeed,
    Friends: friends,
  };
  const navOnClick = {
    Home: () => dispatch(switchToNewfeed()),
    Friends: () => dispatch(switchToFriends()),
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
    <header className="sticky top-0 shadow-md bg-white z-10">
      <nav className="px-4">
        <div className="grid grid-cols-3">
          <div className="self-center">
            <h1 className="lg:flex justify-start text-purple-500 font-bold text-3xl hidden">
              <Link to="/">Odin-book</Link>
            </h1>
          </div>

          <div className="flex justify-center items-center gap-x-4">
            {navItems.map((element, index) => {
              return index === navItems.length - 1 ? (
                <button
                  className="text-gray-500 flex flex-col items-center text-xs hover:bg-gray-100 rounded-lg w-32"
                  key={index}
                  onClick={openPostModal}
                >
                  {navIcons[index]}
                  <div className="hidden sm:block">{element}</div>
                </button>
              ) : (
                <button
                  className="flex flex-col items-center hover:bg-gray-100 rounded-lg w-32"
                  key={index}
                  onClick={navOnClick[element]}
                >
                  <Link
                    to={navRoutes[element]}
                    className={`${
                      navSelected[element]
                        ? "text-purple-500 border-b-2 border-purple-500"
                        : "text-gray-500"
                    } text-xs w-full`}
                  >
                    {navIcons[index]}
                    <div className="hidden sm:block">{element}</div>
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
