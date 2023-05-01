import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import "./styles.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Dispatch the register action with email and password
    dispatch(register({ email, password }));
  };

  return (
    <div className="min-h-screen moving-gradient flex flex-col items-center justify-center gap-10 ">
      <h1 className="text-5xl font-bold text-white">Register</h1>
      <div className="bg-white p-6 rounded shadow-lg w-96 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          <div className="flex flex-col">
            <input
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              id="firstName"
              type="text"
              placeholder="First Name:"
              {...register("firstName", { required: "First name is required" })}
            />
            <div className="h-5">
              <span className="text-red-500 text-sm">
                {errors.firstName?.message}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <input
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              id="lastName"
              type="text"
              placeholder="Last Name:"
              {...register("lastName", { required: "Last name is required" })}
            />
            <div className="h-5">
              <span className="text-red-500 text-sm">
                {errors.lastName?.message}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <input
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              id="email"
              type="email"
              placeholder="Email:"
              {...register("email", { required: "Email is required" })}
            />
            <div className="h-5">
              <span className="text-red-500 text-sm">
                {errors.email?.message}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <input
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              id="password"
              type="password"
              placeholder="Password:"
              {...register("password", { required: "Password is required" })}
            />
            <div className="h-5">
              <span className="text-red-500 text-sm">
                {errors.password?.message}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm" htmlFor="birthday">
              Birthday:
            </label>
            <input
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              id="birthday"
              type="date"
              {...register("birthday", { required: "Birthday is required" })}
            />
            <div className="h-5">
              <span className="text-red-500 text-sm">
                {errors.birthday?.message}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm" htmlFor="gender">
              Gender:
            </label>
            <select
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              id="gender"
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div className="h-5">
              <span className="text-red-500 text-sm">
                {errors.gender?.message}
              </span>
            </div>
          </div>

          <button
            className="bg-pink-600 text-white hover:bg-purple-800 w-full px-6 py-2 rounded font-semibold mr-4 shadow-md transition duration-200"
            type="submit"
          >
            Register
          </button>
        </form>
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
