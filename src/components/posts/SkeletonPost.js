import React from "react";

const SkeletonPost = () => {
  return (
    <div className="bg-white w-full rounded-lg p-4 mb-4 shadow">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="ml-4 w-32 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="h-5 bg-gray-300 rounded"></div>
        <div className="h-5 bg-gray-300 rounded"></div>
        <div className="h-5 bg-gray-300 rounded"></div>
      </div>
      <div className="mt-12 flex">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="w-[90%] h-16 ml-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonPost;
