import { usePatchUserInfoByIdMutation } from "@/redux/features/auth/authApi";
import { iEdit, iTick } from "@/utils/icons/icons";
import { Button, Spinner } from "@material-tailwind/react";
import React, { useContext, useMemo } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { base_url } from "@/utils/auth/global";
import styles from "@/styles/Register.module.css";

const UserInfo = () => {
  const { user, setUser, uploadImg } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const imgRef = useRef();
  const [patchUserInfoById, { isLoading }] = usePatchUserInfoByIdMutation();

  const [time_format, setTime_format] = useState("");

  const handleUserUpdate = async (data) => {
    const newData = new FormData();
    if (data) {
      newData.append("time_format", data);
    }
    if (time_format) {
      const options = {
        id: user?._id,
        data: newData,
      };
      const result = await patchUserInfoById(options);
      if (result?.data?.status === true) {
        setUser(result?.data?.data);
        toast.success("Profile Info Update Successful");
      } else {
        toast.error("Profile Info Update unSuccessful");
      }
    } else {
      toast.error("Something went wrong, Try again");
    }
  };

  useMemo(() => {
    if (user?.time_format) {
      setTime_format(user?.time_format);
    }
  }, [user]);

  const handleImageUpdate = async () => {
    const newData = new FormData();
    if (image) {
      newData.append(`image`, image);
    }
    if (image) {
      const options = {
        id: user?._id,
        data: newData,
      };
      const result = await patchUserInfoById(options);
      if (result?.data?.status === true) {
        setUser(result?.data?.data);
        setImage(null);
        toast.success("Profile Picture changed Successful");
      } else {
        toast.error("Profile Picture changed unSuccessful");
      }
    } else {
      toast.error("Something went wrong, Try again");
    }
  };

  return (
    <div className="w-full h-full">
      <div>
        <div className="h-[200px] w-[200px] bg-blue-gray-100 relative">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-full object-contain"
              alt=""
            />
          ) : (
            <>
              {user?.image ? (
                <img
                  src={`${base_url}/uploads/${user?.image}`}
                  className="w-full h-full object-contain"
                  alt=""
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <h1 className="text-pm text-5xl">
                    {user?.name?.slice(0, 1)}
                  </h1>
                </div>
              )}
            </>
          )}
          <div className="absolute bottom-2 right-2 w-24 flex items-center justify-end gap-1">
            <div
              onClick={() => imgRef.current.click()}
              className="w-12 h-12  bg-red-600 hover:bg-red-700 text-white shadow-none flex justify-center items-center p-0 rounded cursor-pointer"
            >
              {iEdit}
            </div>
            {image && (
              <Button
                onClick={() => handleImageUpdate()}
                disabled={isLoading}
                className="w-12 h-12  bg-green-600 hover:bg-green-700 text-white shadow-none flex justify-center items-center p-0 rounded cursor-pointer"
              >
                {isLoading ? <Spinner color="white" /> : <> {iTick}</>}
              </Button>
            )}
          </div>
          <input
            ref={imgRef}
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
            type="file"
            accept=".png, .jpg, .jpeg"
            multiple={false}
          />
        </div>
        <div className="w-100 h-fit mt-8">
          <label for="exampleInputPassword1" className="form-label font-bold">
            Choose 12 or 24 Hours Time Format<span>*</span>
          </label>
          <div className="flex items-center gap-4 relative">
            <div className="grid grid-cols-6 w-8 absolute -top-10 left-12 opacity-0 z-10">
              <input
                type="text"
                required={!time_format}
                className="opacity-0"
              />
            </div>
            <div className="d-flex gap-2 align-items-center mb-3 z-50">
              <input
                type="checkbox"
                className="mb-0 cursor-pointer"
                checked={time_format === "12h"}
                onClick={() => handleUserUpdate("12h")}
              />
              <p
                className={`mb-0 ${styles.agreementText} text-black font-bold`}
              >
                12h
              </p>
            </div>
            <div className="d-flex gap-2 align-items-center mb-3 z-50">
              <input
                type="checkbox"
                className="mb-0 cursor-pointer"
                checked={time_format === "24h"}
                onClick={() => handleUserUpdate("24h")}
              />
              <p
                className={`mb-0 ${styles.agreementText} text-black font-bold`}
              >
                24h
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleUserUpdate)}></form>
      </div>
    </div>
  );
};

export default UserInfo;
