import React from "react";
import { useForm } from "react-hook-form";

import MaterialIcon from "../common/MaterialIcon";
import InputField from "../common/InputField";

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
        inputClassName="textborder bg-gray-100 w-full p-2 rounded-lg focus:outline-none text-sm"
        rows={2}
        isTextArea={true}
        labeltext="Comment content"
        validation={{
          required: "Content is required",
        }}
      />
      <button className="absolute top-7 right-7">
        <MaterialIcon
          className="material-symbols-outlined text-xl text-gray-500 absolute"
          iconName={"send"}
        />
      </button>
    </form>
  );
};

export default CommentField;