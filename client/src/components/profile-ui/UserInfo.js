import { usePatchUserInfoByIdMutation } from "@/redux/features/auth/authApi";
import { iEdit, iTick } from "@/utils/icons/icons";
import { Button, Spinner } from "@material-tailwind/react";
import React, { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

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

  const handleUserUpdate = (data) => {
    console.log(data);
  };

  const handleImageUpdate = async () => {
    const img = await uploadImg([image]);
    if (img) {
      const options = {
        id: user?._id,
        data: { image: img[0] },
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
              className="w-full h-full object-cover"
              alt=""
            />
          ) : (
            <>
              {user?.image ? (
                <img
                  src={user?.image}
                  className="w-full h-full object-cover"
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
        <form onSubmit={handleSubmit(handleUserUpdate)}></form>
      </div>
    </div>
  );
};

export default UserInfo;
