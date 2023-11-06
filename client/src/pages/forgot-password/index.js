import { usePostForgotPasswordMutation } from "@/redux/features/auth/authApi";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "@/styles/RegisterModal.module.css";
import LoadingBtn from "@/components/commons/buttons/LoadingBtn";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Button, Input, Spinner } from "@material-tailwind/react";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [postForgotPassword, { isLoading, data }] =
    usePostForgotPasswordMutation();
  const [show, setShow] = useState(0);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const inputRefs = useRef([]);
  const handleChange = async (index, value) => {
    if (value.length > 1) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const isFilled = otp.every((digit) => digit !== "");

  const handleForgot = async (data) => {
    setMessage("");
    setEmail(data.email);
    const options = {
      data: data,
    };
    const result = await postForgotPassword(options);
    if (result.data.status) {
      setShow(1);
    } else {
      setMessage(result.data.message);
    }
  };

  const handleOTP = async () => {
    setMessage("");
    const options = {
      data: { email: email, otp: otp.join("") },
    };
    const result = await postForgotPassword(options);
    if (result.data.status) {
      setShow(2);
    } else {
      setMessage(result.data.message);
    }
  };

  const handlePassword = async (data) => {
    console.log(data);
    const options = {
      data: { email: email, password: data.password },
    };
    const result = await postForgotPassword(options);
    if (result.data.success) {
      setMessage("");
      toast.success("Successfully Changed Password!");
      router.push("/");
    } else {
      setMessage(result.data.message);
    }
  };

  return (
    <div className="min-h-[420px]">
      {show === 0 && (
        <form
          onSubmit={handleSubmit(handleForgot)}
          className="mx-auto max-w-[600px] bg-white border my-12 p-4"
        >
          <h1 className="text-center font-bold mb-4 uppercase">
            Forgot Password
          </h1>
          <Input
            {...register("email", { required: "Email is Required" })}
            type="email"
            variant="bordered"
            name="email"
            error={errors.email ? true : false}
            className="bg-white mb-2"
            label="Email"
          />

          {message && (
            <p className="text-center text-red-500 my-2">{message}</p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#037D41] text-white rounded w-full mt-4 flex justify-center items-center"
          >
            {isLoading ? <Spinner color="white" /> : " Submit"}
          </Button>
        </form>
      )}
      {show === 1 && (
        <div className="mx-auto max-w-[600px] bg-white border my-12 p-4">
          <p className="text-center">
            Please enter the Verification code received in your email
          </p>
          <div className={styles.otpInputContainer}>
            <div className={`d-flex gap-2 mb-5 ${styles.otpInput}`}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  // disabled={isOtpVerified}
                  type="number"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  autoComplete="off"
                />
              ))}
            </div>
          </div>

          {message && (
            <p className="text-center text-red-500 my-2">{message}</p>
          )}

          <div className={styles.completeButtonContainer}>
            <Button
              type="submit"
              onClick={() => handleOTP()}
              disabled={!isFilled || isLoading}
              className="bg-[#037D41] text-white rounded w-full mt-4 flex justify-center items-center"
            >
              {isLoading ? <Spinner color="white" /> : " Submit"}
            </Button>
          </div>
        </div>
      )}
      {show === 2 && (
        <form
          onSubmit={handleSubmit(handlePassword)}
          className="mx-auto max-w-[600px] bg-white border my-12 p-4"
        >
          <h1 className="text-center font-bold mb-4 uppercase">
            Change New Password
          </h1>
          <div className="relative mb-2">
            <Input
              {...register("password", {
                pattern:
                  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).+$/,
              })}
              type={isVisible ? "text" : "password"}
              name="password"
              error={errors.password ? true : false}
              className="bg-white"
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              icon={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              }
            />
            {errors.password && (
              <small className="text-red-600">
                Password must contain at least one number, one uppercase letter,
                one lowercase letter, and one special character
              </small>
            )}
          </div>

          {message && (
            <p className="text-center text-red-500 my-2">{message}</p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#037D41] text-white rounded w-full mt-4 flex justify-center items-center"
          >
            {isLoading ? <Spinner color="white" /> : " Submit"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
