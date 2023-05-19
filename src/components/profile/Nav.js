import React from "react";

const Nav = () => {
  return (
    <div className="flex w-full bg-white relative h-12 md:px-[5%] lg:px-[15%] shadow">
      <div className="border-t flex w-full justify-center md:justify-start">
        <button className="bg-gray-200 px-4 py-2">Home</button>
        <button className="px-4 py-2">Friends</button>
      </div>
    </div>
  );
};

export default Nav;
