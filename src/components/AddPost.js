import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { createPost } from "../api";
import MaterialIcon from "./MaterialIcon";
import InputField from "./InputField";

const AddPost = ({ isOpen, closeModal }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const onSubmit = (data) => {
    const result = createPost(data, token);
    console.log(result);
    closeModal();
  };

  const closeIcon = "close";

  if (!isOpen) return null;

  return (
    <div className="add-post-modal">
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">Add a new post</h2>
          <button onClick={closeModal}>
            <MaterialIcon
              className="material-symbols-outlined text-4xl"
              iconName={closeIcon}
            />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            register={register}
            errors={errors}
            id="content"
            type="text"
            placeholder={`What's on your mind, ${user.firstName}?`}
            rows={4}
            isTextArea={true}
            labeltext="Post content"
            validation={{
              required: "Content is required",
            }}
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
