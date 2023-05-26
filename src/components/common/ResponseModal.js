import React, { useState, useEffect } from "react";

import MaterialIcon from "./MaterialIcon";

const ResponseModal = ({ status, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setIsVisible(false), 3500);
      // Cleanup function to clear the timeout in case of unmounting
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (status && isVisible) {
    return (
      <div className="fixed top-20 right-4 mt-1 p-1 bg-green-600 rounded-md shadow-3xl text-white text-left flex pl-4 pb-3 items-center gap-x-4">
        <MaterialIcon
          iconName="check_circle"
          className="material-symbols-outlined text-2xl text-white mt-2"
        />
        <div className="mt-2 w-44">
          <div className="font-bold">Success!</div>
          <div>{message}</div>
        </div>
        <button
          className="self-start hover:bg-green-700 rounded-full w-4 h-4 flex justify-center items-center"
          onClick={() => setIsVisible(false)}
        >
          <MaterialIcon
            className="material-symbols-outlined text-sm"
            iconName="close"
          />
        </button>
      </div>
    );
  }

  return null;
};

export default ResponseModal;
