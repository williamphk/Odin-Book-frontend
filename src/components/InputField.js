import React from "react";

const InputField = ({
  register,
  errors,
  id,
  type,
  placeholder,
  labeltext,
  validation,
}) => {
  return (
    <div className="flex flex-col">
      {type === "date" && (
        <label className="text-sm" htmlFor={id}>
          {placeholder}
        </label>
      )}
      <input
        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
        id={id}
        type={type}
        placeholder={placeholder}
        aria-label={labeltext}
        {...register(id, validation)}
      />
      <div className="h-5">
        <span className="text-red-500 text-sm">{errors[id]?.message}</span>
      </div>
    </div>
  );
};

export default InputField;
