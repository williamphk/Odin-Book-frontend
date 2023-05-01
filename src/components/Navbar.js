import React, { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // When the Navbar component is unmounted, the event listener is removed
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = ["Profile", "Setting", "Logout"];

  return (
    <nav className="bg-purple-600 px-4 py-2">
      <div className="grid grid-cols-3">
        <div className="flex justify-start self-center text-white font-bold text-3xl">
          <a href="/">Odin-book</a>
        </div>

        <div className="flex justify-center gap-x-16">
          <button>
            <a href="/" className="text-white">
              Home
            </a>
          </button>
          <button>
            <a href="/friends" className="text-white">
              Friends
            </a>
          </button>
          <button>
            <a href="/post" className="text-white">
              Post
            </a>
          </button>
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
              {menuItems.map((element) => (
                <a
                  href="/profile"
                  className="block px-4 py-2 hover:bg-purple-600 hover:text-white"
                >
                  {element}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
