import React from "react";
import "../styles.css";
import { useForm } from "react-hook-form";

import MaterialIcon from "../common/MaterialIcon";
import InputField from "../common/InputField";

const PostModal = ({
  title,
  placeholder,
  value,
  setPostContent,
  closePostModal,
  requiredInputField,
  requiredFileUpload,
  button,
  onSubmit,
  buttonColor,
  buttonHoverColor,
  setSelectedFile,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const closeIcon = "close";

  // if (!isOpen) return null;

  return (
    <div className="add-post-modal">
      <div className="modal-overlay" onClick={closePostModal}></div>
      <div className="modal-content">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={closePostModal}>
            <MaterialIcon
              className="material-symbols-outlined text-4xl hover:bg-gray-100 rounded-lg"
              iconName={closeIcon}
            />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {requiredInputField && (
            <InputField
              register={register}
              errors={errors}
              id="content"
              type="text"
              placeholder={placeholder}
              value={value}
              setPostContent={setPostContent}
              rows={4}
              isTextArea={true}
              labeltext="Post content"
              validation={{
                required: "Content is required",
              }}
            />
          )}
          {requiredFileUpload && (
            <input
              type="file"
              id="profile_picture"
              name="profile_picture"
              onChange={(event) => setSelectedFile(event.target.files[0])}
            />
          )}
          <button
            className={`${
              buttonColor || "bg-blue-500"
            } text-white px-4 py-2 rounded shadow-md ${
              buttonHoverColor
                ? "hover:" + buttonHoverColor
                : "hover:bg-blue-600"
            }
            transition duration-200`}
          >
            {button}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
