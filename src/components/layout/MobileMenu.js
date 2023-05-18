import React from "react";
import { useSelector } from "react-redux";

const MobileMenu = () => {
  const profile = useSelector((state) => state.page.profile);

  if (profile) {
    return;
  }

  return (
    <ul className="flex flex-col lg:hidden text-left pl-2">
      <li className="py-1 hover:bg-gray-100 w-full">Friend requests</li>
      <li className="py-1 hover:bg-gray-100 w-full">Friend suggestions</li>
      <li className="py-1 hover:bg-gray-100 w-full">All friends</li>
    </ul>
  );
};

export default MobileMenu;
