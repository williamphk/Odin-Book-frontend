import React from "react";

const Intro = ({ user, userId }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow p-3 flex flex-col gap-y-4">
      <div className="font-bold text-lg">Intro</div>
      {(!userId || userId === user._id) && (
        <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
          <button className="w-full">Add work</button>
        </div>
      )}
      {(!userId || userId === user._id) && (
        <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
          <button className="w-full">Add eduation</button>
        </div>
      )}
      {(!userId || userId === user._id) && (
        <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
          <button className="w-full">Add current city</button>
        </div>
      )}
      {(!userId || userId === user._id) && (
        <div className="text-sm rounded-lg bg-gray-200 hover:bg-gray-300 py-1">
          <button className="w-full">Edit details</button>
        </div>
      )}
    </div>
  );
};

export default Intro;
