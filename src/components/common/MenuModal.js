import React from "react";
import { Link } from "react-router-dom";

const Modal = ({ menuItems }) => {
  return (
    <div className="absolute top-full right-1 w-36 mt-1 p-1 bg-white rounded-md shadow-lg text-gray-700">
      {menuItems.map((element, index) => {
        return element.isLink ? (
          <button
            className="w-full block hover:bg-purple-600 hover:text-white transition duration-100"
            key={index}
            onClick={element.onClick}
          >
            <Link
              className="w-full block px-4 py-2 hover:bg-purple-600 hover:text-white"
              to={"/" + element.name}
            >
              {element.name}
            </Link>
          </button>
        ) : (
          <button
            type="button"
            key={index}
            onClick={element.onClick}
            className="w-full block px-4 py-2 hover:bg-purple-600 hover:text-white transition duration-100"
          >
            {element.name}
          </button>
        );
      })}
    </div>
  );
};

export default Modal;
