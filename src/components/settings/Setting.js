import React from "react";

const Setting = () => {
  return (
    <div className="container w-3/4">
      <div className="bg-white flex flex-col items-start p-6 w-full text-left rounded-lg">
        <div className="border-b w-full">
          <h2 className="flex text-xl font-medium">Setting</h2>
          <h3 className="pt-5 pb-3 text-lg">Delete your account</h3>
        </div>
        <p className="pt-3">This is permanent</p>
        <p>
          Once you delete your account, you won't be able to retrieve the
          content and information that you've shared on Odin-book, including
          your profile, friends, posts, comments and likes.
        </p>
        <div className="pt-3 flex gap-x-3 self-end">
          <button className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg">
            Cancel
          </button>
          <button className="bg-red-500 hover:bg-red-600 px-6 py-2 text-white rounded-lg">
            Continue to account deletion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
