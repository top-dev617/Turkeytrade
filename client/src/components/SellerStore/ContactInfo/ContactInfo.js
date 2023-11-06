import { AuthContext } from "@/components/context/AuthContext";
import { useGetStoreInfoBySellerIdQuery } from "@/redux/features/stores/storeApi";
import React, { useContext } from "react";
import SteelManufacturer from "./SteelManufacturer";
import { useRouter } from "next/router";
import StoreInformation from "./StoreInformation";
import { usePatchUserInfoByIdMutation } from "@/redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import SellerStoreInfo from "./SellerStoreInfo";

const ContactInfo = ({ store }) => {
  const { handleSubmit, register, reset } = useForm();
  const { pathname, asPath } = useRouter();
  const { user } = useContext(AuthContext);
  const { data } = useGetStoreInfoBySellerIdQuery(user?._id);
  const storeData = asPath === "/mystore" ? data?.data : store;

  const [patchUserInfoById, { isLoading }] = usePatchUserInfoByIdMutation();
  const [isEdit, setIsEdit] = useState(false);

  const handleSave = async (data) => {
    const options = {
      data: {
        social: {
          facebook: data?.facebook
            ? data?.facebook
            : storeData?.user?.social?.facebook,
          instagram: data?.instagram
            ? data?.instagram
            : storeData?.user?.social?.instagram,
          twitter: data?.twitter
            ? data?.twitter
            : storeData?.user?.social?.twitter,
        },
      },
      id: storeData?.user?._id,
    };
    const result = await patchUserInfoById(options);
    if (result?.data?.status === true) {
      reset();
      setIsEdit(false);
      toast.success("info Add Successfully");
    } else {
      toast.error("info add unsuccessfully");
    }
  };
  // console.log(user?._id !== storeData?.user?._id && storeData?.user?.social);
  return (
    <div className="contact_info mx-auto">
      <div className="w-full">
        <SteelManufacturer
          store={storeData}
          isAuthor={user?._id === storeData?.user?._id ? true : false}
        />

        <SellerStoreInfo
          store={storeData}
          isAuthor={user?._id === storeData?.user?._id ? true : false}
        />
        <div
          className={`social_media relative
        ${
          user?._id !== storeData?.user?._id && storeData?.user?.social
            ? "hidden"
            : "hidden"
        }
        `}
        >
          <h5>Social Media</h5>

          {user?._id === storeData?.user?._id && (
            <button
              onClick={() => setIsEdit(true)}
              className="rounded-full p-2 bg-white hover:bg-pm border text-black 
            hover:text-pm absolute top-3 right-3 cursor-pointer"
            >
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          )}

          {isEdit ? (
            <form onSubmit={handleSubmit(handleSave)} className="mt-6">
              <div className="grid md:grid-cols-1 gap-x-4">
                <div>
                  <label>Facebook</label>
                  <input
                    {...register("facebook", { required: false })}
                    type="url"
                    name="facebook"
                    placeholder="Facebook"
                    defaultValue={storeData?.user?.social?.facebook}
                    className=""
                  />
                </div>
                <div>
                  <label>Instagram</label>
                  <input
                    {...register("instagram", { required: false })}
                    type="url"
                    name="instagram"
                    placeholder="Instagram"
                    defaultValue={storeData?.user?.social?.instagram}
                    className=""
                  />
                </div>
                <div>
                  <label>Twitter</label>
                  <input
                    {...register("twitter", { required: false })}
                    type="url"
                    name="twitter"
                    placeholder="Twitter"
                    defaultValue={storeData?.user?.social?.twitter}
                    className=""
                  />
                </div>
              </div>
              <div className="flex justify-end items-center gap-4">
                <Button
                  onClick={() => setIsEdit(false)}
                  className="bg-red-600 text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-pm text-white flex justify-center items-center"
                >
                  {isLoading ? (
                    <Spinner color="white" className="font-bold" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="d-flex justify-content-between">
              <p>
                Facebook :
                <span>
                  {" "}
                  {storeData?.user?.social?.facebook ||
                    "facebook.com/username "}
                </span>
              </p>
              <p>
                Instagram :
                <span>
                  {" "}
                  {storeData?.user?.social?.instagram ||
                    "instagram.com/username"}
                </span>
              </p>
              <p>
                Twitter :
                <span>
                  {" "}
                  {storeData?.user?.social?.twitter || "twitter.com/username"}
                </span>
              </p>
            </div>
          )}
        </div>

        <StoreInformation
          store={storeData}
          isAuthor={user?._id === storeData?.user?._id ? true : false}
        />
      </div>
    </div>
  );
};

export default ContactInfo;
