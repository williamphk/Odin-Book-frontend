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
    watch,
    formState: { errors },
  } = useForm();

  const allFieldValues = watch();

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
        inputClassName="textborder bg-gray-100 w-full p-2 rounded-lg focus:outline-none text-sm resize-none"
        rows={2}
        isTextArea={true}
        labeltext="Comment content"
        validation={{
          required: "Content is required",
        }}
      />
      <button
        disabled={!allFieldValues.content}
        className="absolute bottom-0 right-1 w-[28px] h-[28px] mb-1 hover:bg-gray-200 disabled:bg-transparent rounded-full flex justify-center items-center"
      >
        <MaterialIcon
          className={`material-symbols-outlined text-xl ${
            allFieldValues.content ? "text-purple-500" : "text-gray-500"
          } absolute`}
          iconName={"send"}
        />
      </button>
    </form>
  );
};

export default CommentField;
