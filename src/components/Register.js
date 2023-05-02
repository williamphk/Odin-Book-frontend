import React from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import InputField from "./InputField";

import "./styles.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    try {
      await dispatch(signUp(data));
      // Redirect to homepage
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="min-h-screen moving-gradient flex flex-col items-center justify-center gap-10 ">
      <h1 className="text-5xl font-bold text-white">Register</h1>
      <div className="bg-white p-6 rounded shadow-lg w-2/5 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          {/* firstname */}
          <InputField
            register={register}
            errors={errors}
            id="firstName"
            type="text"
            placeholder="First Name:"
            labeltext="First Name"
            validation={{
              required: "First Name is required",
            }}
          />
          {/* lastname */}
          <InputField
            register={register}
            errors={errors}
            id="lastName"
            type="text"
            placeholder="Last Name:"
            labeltext="Last Name"
            validation={{
              required: "Last Name is required",
            }}
          />
          {/* email */}
          <InputField
            register={register}
            errors={errors}
            id="email"
            type="email"
            placeholder="Email:"
            labeltext="Email"
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
          />
          {/* password */}
          <InputField
            register={register}
            errors={errors}
            id="password"
            type="password"
            placeholder="Password:"
            labeltext="Password"
            validation={{
              required: "Password is required",
            }}
          />
          {/* confirm password */}
          <InputField
            register={register}
            errors={errors}
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password:"
            labeltext="Confirm Password"
            validation={{
              required: "Confirm Password is required",
            }}
          />
          {/* birthday */}
          <InputField
            register={register}
            errors={errors}
            id="birthday"
            type="date"
            placeholder="Birthday:"
            labeltext="Birthday"
            validation={{
              required: "Birthday is required",
            }}
          />
          {/* gender */}
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="gender">
              Gender:
            </label>
            <select
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              id="gender"
              labeltext="Gender"
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Other</option>
            </select>
            <div className="h-5">
              <span className="text-red-500 text-sm">
                {errors.gender?.message}
              </span>
            </div>
          </div>
          {/* register button */}
          <button
            className="bg-pink-600 text-white hover:bg-purple-800 w-full px-6 py-2 rounded font-semibold mr-4 shadow-md transition duration-200"
            type="submit"
          >
            Register
          </button>
        </form>
        {/* login button */}
        <div className="flex">
          <Link to="/" className="w-full">
            <button
              className="bg-purple-600 text-white hover:bg-purple-800 w-full px-6 py-2 rounded font-semibold mr-4 shadow-md transition duration-200"
              type="button"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
