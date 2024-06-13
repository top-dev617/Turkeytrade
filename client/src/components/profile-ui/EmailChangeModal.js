import { Button, Dialog, Spinner } from "@material-tailwind/react";
import React, { useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useAddNewEmailMutation } from "@/redux/features/auth/authApi";
import { useForm } from "react-hook-form";

const EmailChangeModal = ({ open, onClose }) => {
  const { user, setUser } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const [addNewEmail, { isLoading }] = useAddNewEmailMutation();

  const [email, setEmail] = useState("");
  const [isRequest, setIsRequest] = useState(0);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleRequest = async (data) => {
    if (!data?.email) {
      return;
    }
    const options = {
      data: { email: data?.email, step: 1 },
    };
    const result = await addNewEmail(options);
    if (result?.data?.status === true) {
      if (result?.data?.emailExist) {
        setError("email", { type: "manual", message: "Email already exists" });
        return;
      }
      setEmail(data?.email);
      setIsRequest(60);
      const interval = setInterval(() => {
        setIsRequest((prevIsRequest) => {
          if (prevIsRequest <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prevIsRequest - 1;
        });
      }, 1000);
    } else {
      toast.error("Verification request failed");
    }
  };

  const handleDone = () => {
    setEmail("");
    setIsRequest(0);
    reset();
    onClose(false);
  };

  const handleVerification = async (data) => {
    if (!email) {
      setEmail("");
      return;
    }
    setOtpLoading(true);
    const options = {
      data: { email: email, otp: data?.otp, step: 2 },
    };
    const result = await addNewEmail(options);
    if (result?.data?.status === true) {
      if (result?.data?.emailExist) {
        setError("email", { type: "manual", message: "Email already exists" });
        return;
      }
      if (result?.data?.new) {
        setUser(result?.data?.data);
        handleDone();
        toast.success("Info added successfully");
      }
    } else {
      if (result?.data?.otp === false) {
        setError("otp", { type: "manual", message: "OTP not matched" });
      }
    }
    setOtpLoading(false);
  };

  // useMemo(() => {
  //   if (user) {
  //     if (user?.user_type === "Social") {
  //       setValue("email", user?.secondaryEmail);
  //     } else {
  //       setValue("email", user?.email);
  //     }
  //   }
  // }, []);
  return (
    <Dialog
      open={open}
      handler={() => handleDone()}
      className="!bg-transparent shadow-none flex justify-center items-center p-0"
    >
      <div className="!max-w-[450px] w-full min-h-[300px] max-h-[500px] h-full bg-white border shadow-sm rounded-md py-[12px] px-[12px]">
        <h1 className="font-bold font-inter leading-normal text-[14px] text-black">
          Edit Email
        </h1>
        <form
          onSubmit={handleSubmit(handleRequest)}
          className="mt-4 w-full h-full"
        >
          <h1 className="font-semibold font-inter leading-normal text-[13px] text-black mb-2">
            New Email
          </h1>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Enter your email address"
            className="w-full h-[38px] rounded-[6px] text-black outline-none bg-gray-100 border px-2 text-sm font-inter font-medium placeholder:text-gray-500"
          />
          {errors?.email ? (
            <i className="text-[11px] font-semibold block font-inter text-red-600 mt-1">
              {errors.email.message}
            </i>
          ) : (
            <i className="text-[11px] font-semibold block font-inter text-red-600 mt-1 opacity-0">
              Email Error
            </i>
          )}

          {email ? (
            <Button
              disabled={isRequest > 0}
              type="submit"
              className="w-fit h-[40px] bg-pm hover:bg-pmd text-white font-inter leading-normal font-medium text-[13px] shadow-none hover:shadow-none py-0 px-3 rounded mt-2 normal-case flex justify-center items-center gap-2"
            >
              {isLoading && otpLoading === false && <Spinner color="white" />}
              Resend OTP {isRequest > 0 && <span>{isRequest}</span>}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-fit h-[40px] bg-pm hover:bg-pmd text-white font-inter leading-normal font-medium text-[13px] shadow-none hover:shadow-none py-0 px-3 rounded mt-2 normal-case flex justify-center items-center gap-2"
            >
              {isLoading && otpLoading === false && <Spinner color="white" />}
              Request verification code
            </Button>
          )}
        </form>

        {email && (
          <form
            onSubmit={handleSubmit(handleVerification)}
            className="mt-4 w-full h-full"
          >
            <h1 className="font-semibold font-inter leading-normal text-[13px] text-black mb-2">
              Verification code
            </h1>
            <input
              {...register("otp", { required: "OTP is required" })}
              type="text"
              placeholder="Enter OTP code"
              className="w-full max-w-[180px] h-[38px] rounded-[6px] text-black outline-none bg-gray-100 border px-2 text-sm font-inter font-medium placeholder:text-gray-500"
            />
            {errors?.otp ? (
              <i className="text-[11px] font-semibold block font-inter text-red-600 mt-1">
                {errors.otp.message}
              </i>
            ) : (
              <i className="text-[11px] font-semibold block font-inter text-red-600 mt-1 opacity-0">
                OTP
              </i>
            )}

            <Button
              disabled={otpLoading}
              type="submit"
              className="w-fit h-[40px] bg-pm hover:bg-pmd text-white font-inter leading-normal font-medium text-[13px] shadow-none hover:shadow-none py-0 px-3 rounded mt-1 normal-case flex justify-center items-center gap-2"
            >
              {otpLoading && <Spinner color="white" />}
              Submit
            </Button>
          </form>
        )}
      </div>
    </Dialog>
  );
};

export default EmailChangeModal;
