"use client";

import { token_name } from "@/lib/constants";
import { usePostLoginMutation } from "@/redux/features/auth/authApi";
import { Button, Spinner } from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
  const [postLogin, { isLoading }] = usePostLoginMutation();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const options = {
      data: data,
    };
    const result = await postLogin(options);
    if (result?.data?.success) {
      localStorage.setItem(token_name, result?.data?.accessToken);
      toast.success("Login Successful");
      window.location.reload();
    }
    if (
      result?.error?.data?.success === false &&
      result?.error?.data?.type === "email"
    ) {
      setError("email", {
        type: "manual",
        message: result?.error?.data?.message,
      });
    }
    if (
      result?.error?.data?.success === false &&
      result?.error?.data?.type === "password"
    ) {
      setError("password", {
        type: "manual",
        message: result?.error?.data?.message,
      });
    }
  };
  return (
    <div className="bg-white h-screen flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="md:max-w-[508px] md:max-h-[291px] flex flex-col gap-[22px] w-full bg-white"
      >
        <div>
          <label
            className="font-inter text-black font-semibold text-[19px] mb-[19px]"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            className={`h-14 w-full rounded bg-[#F3F3F3] outline-none px-[19px] placeholder:text-[#ABABAB] ${
              errors.email &&
              "!border !border-red-600 focus:!border focus:!border-red-600"
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <small className="text-red-500 text-xs italic block">
              {errors.email.message}
            </small>
          )}
        </div>

        <div>
          <label
            className="font-inter text-black font-semibold text-[19px] mb-[19px]"
            htmlFor="Password"
          >
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is Required",
            })}
            type="password"
            className={`h-14 w-full rounded bg-[#F3F3F3] outline-none px-[19px] placeholder:text-[#ABABAB] ${
              errors.password && "!border !border-red-600"
            }`}
            placeholder="Password"
          />
          {errors.password && (
            <small className="text-red-500 text-xs italic block">
              {errors.password.message}
            </small>
          )}
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-pm text-white rounded min-h-[56px] shadow-none flex justify-center items-center"
        >
          {isLoading ? <Spinner color="white" /> : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
