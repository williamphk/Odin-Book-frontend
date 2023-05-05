import React, { useState } from "react";
import { useForm } from "react-hook-form";

import MaterialIcon from "./MaterialIcon";
import InputField from "./InputField";

const CommentField = ({
  commentContent,
  setCommentContent,
  placeholder,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-full flex justify-end"
    >
      <InputField
        register={register}
        errors={errors}
        id="content"
        type="text"
        placeholder={placeholder || "Write a comment..."}
        value={commentContent}
        setPostContent={setCommentContent}
        inputClassName="textborder bg-gray-100 w-full p-2 rounded-lg focus:outline-none"
        rows={2}
        isTextArea={true}
        labeltext="Comment content"
        validation={{
          required: "Content is required",
        }}
      />
      <button className="absolute top-9 right-6">
        <MaterialIcon
          className="material-symbols-outlined text-xl text-gray-500 absolute"
          iconName={"send"}
        />
      </button>
    </form>
  );
};

export default CommentField;
