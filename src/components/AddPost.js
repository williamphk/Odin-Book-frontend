import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";

const AddPost = ({ isOpen, closeModal }) => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="add-post-modal">
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-4">Add a new post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="border border-gray-300 w-full p-2 mb-4 rounded"
            placeholder={`What's on your mind, ${user.firstName}?`}
            rows={4}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-200"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
