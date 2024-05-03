import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostChangePasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { iEyeHide, iEyeShow } from "@/utils/icons/icons";

const schema = yup.object().shape({
  old_password: yup.string().required("Password is required"),
  new_password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).+$/,
      "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character"
    ),
  repeat_password: yup
    .string()
    .required("Repeat Password is required")
    .oneOf([yup.ref("new_password"), null], "Passwords must match"),
});

const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [postChangePassword, { isLoading }] = usePostChangePasswordMutation();

  const [passwordShow, setPasswordShow] = useState({
    old_password: false,
    new_password: false,
    repeat_password: false,
  });

  const handleChangePassword = async (data) => {
    const options = { data: data };
    const result = await postChangePassword(options);
    if (result?.error?.data?.message) {
      toast.error(result?.error?.data?.message);
    }
    if (result?.data?.success) {
      reset();
      toast.success(result?.data?.message);
    } else {
      toast.error(result?.data?.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleChangePassword)}>
      <div>
        <div className="pt-4">
          <h1 className="py-2 text-2xl font-semibold">Change Password</h1>
        </div>
        <hr className="mt-4 mb-8" />

        <div className="mb-2 max-w-[500px]">
          <label for="exampleInputPassword1" className="form-label mb-1 label">
            Old Password<span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              {...register("old_password", { required: true })}
              type={passwordShow.old_password ? "text" : "password"}
              placeholder="Old Password "
              className={`input px-4 mb-0 ${
                errors.old_password ? "border !border-red-600" : "border-none"
              }`}
              autoComplete="off"
              name="old_password"
            />
            <div
              onClick={() =>
                setPasswordShow({
                  ...passwordShow,
                  old_password: !passwordShow.old_password,
                })
              }
              className="absolute top-5 right-3 cursor-pointer"
            >
              {passwordShow.old_password ? iEyeShow : iEyeHide}
            </div>
          </div>
          {errors.old_password && (
            <i className="text-red-600 text-xs">
              {errors.old_password.message}
            </i>
          )}
        </div>
        <div className="mb-2 max-w-[500px]">
          <label for="exampleInputPassword1" className="form-label mb-1 label">
            New Password<span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              {...register("new_password", { required: true })}
              type={passwordShow.new_password ? "text" : "password"}
              placeholder="New Password "
              className={`input px-4 mb-0 ${
                errors.new_password ? "border !border-red-600" : "border-none"
              }`}
              autoComplete="off"
              name="new_password"
            />
            <div
              onClick={() =>
                setPasswordShow({
                  ...passwordShow,
                  new_password: !passwordShow.new_password,
                })
              }
              className="absolute top-5 right-3 cursor-pointer"
            >
              {passwordShow.new_password ? iEyeShow : iEyeHide}
            </div>
          </div>
          {errors.new_password && (
            <i className="text-red-600 text-xs">
              {errors.new_password.message}
            </i>
          )}
        </div>

        <div className="mb-2 max-w-[500px]">
          <label for="exampleInputPassword1" className="form-label mb-1 label">
            Repeat Password<span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              {...register("repeat_password", { required: true })}
              type={passwordShow.repeat_password ? "text" : "password"}
              placeholder="Repeat Password "
              className={`input px-4 mb-0 ${
                errors.repeat_password
                  ? "border !border-red-600"
                  : "border-none"
              }`}
              autoComplete="off"
              name="repeat_password"
            />
            <div
              onClick={() =>
                setPasswordShow({
                  ...passwordShow,
                  repeat_password: !passwordShow.repeat_password,
                })
              }
              className="absolute top-5 right-3 cursor-pointer"
            >
              {passwordShow.repeat_password ? iEyeShow : iEyeHide}
            </div>
          </div>
          {errors.repeat_password && (
            <i className="text-red-600 text-xs">
              {errors.repeat_password.message}
            </i>
          )}
        </div>

        <button
          type="submit"
          className="bg-pm hover:bg-pmd text-white w-fit px-4 h-12 rounded-md my-4"
          disabled={isLoading}
        >
          {isLoading ? <Spinner color="white" /> : "Change"}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
