import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

import "./styles.css";

const LandingPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [errorEmailMessage, setEmailErrorMessage] = useState("");
  const [errorPasswordMessage, setPasswordErrorMessage] = useState("");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("http://localhost:3000/login", data);
      console.log("Login response:", response);
      //redirect to another page, etc.
      localStorage.setItem("token", response.data.token);
      dispatch(login({ token: response.data.token }));
      console.log(isLoggedIn);
    } catch (error) {
      console.error("Error during login:", error);
      setEmailErrorMessage(error.response.data.email);
      setPasswordErrorMessage(error.response.data.password);
    }
  };

  return (
    <div className="min-h-screen moving-gradient flex flex-col items-center justify-center gap-10">
      <h1 className="text-5xl font-bold text-white">odin-book</h1>
      <h2 className="text-3xl text-white">
        Connect with friends and the world
      </h2>
      <div className="bg-white p-6 rounded shadow-lg w-90 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-col">
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <div className="h-5">
              <span className="text-red-500 text-sm">
                {errors.email?.message || errorEmailMessage}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            <div className="h-5">
              <span className="text-red-500 text-sm">
                {errors.password?.message || errorPasswordMessage}
              </span>
            </div>
          </div>
          <button className="bg-purple-600 text-white hover:bg-purple-800 w-full px-6 py-2 rounded font-semibold mr-4 shadow-md transition duration-200">
            Login
          </button>
        </form>
        <div className="flex space-x-4">
          <Link to="/register">
            <button className="bg-pink-500 text-white px-7 py-2 rounded font-semibold shadow-md transition duration-200">
              Register
            </button>
          </Link>
          <button className="bg-blue-500 text-white px-6 py-2 rounded font-semibold shadow-md transition duration-200">
            Login with Facebook
          </button>
        </div>

        <button
          className=""
          onClick={() =>
            onSubmit({ email: "test@test.com", password: "12345678aA!" })
          }
        >
          Login with Test Account
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
