import useInputPattern from "@/lib/hooks/useInputPattern";
import {
  useUpdateUserInfoWithEmailMutation,
  useUpdateUserStoreInfoMutation,
} from "@/redux/features/auth/authApi";
import { useStoreInfoUpdateMutation } from "@/redux/features/stores/storeApi";
import { Button, Spinner } from "@material-tailwind/react";
import React, { useMemo } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SellerStoreInfo = ({ store, isAuthor }) => {
  const { handleAlphabeticInput, handlePhoneNumberInput } = useInputPattern();
  const { handleSubmit, register, reset, setValue } = useForm();
  const [updateUserStoreInfo] = useUpdateUserStoreInfoMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log(store);

  const handleEdit = async (data) => {
    setLoading(true);
    const options = {
      data: {
        userData: {
          email: data?.email || store?.user?.email,
          phoneNumber: data?.phoneNumber || store?.user?.phoneNumber,
        },
        storeData: {
          company_address: {
            province: data?.province || store?.company_address?.province,
            city: data?.city || store?.company_address?.city,
            address: data?.address || store?.company_address?.address,
            postal_code:
              data?.postal_code || store?.company_address?.postal_code,
          },
        },
      },
      storeId: store?._id,
    };
    const result = await updateUserStoreInfo(options);
    setIsEdit(false);
    setLoading(false);
    if (result?.data?.status === true) {
      if (result?.data?.emailExist) {
        setValue("email", store?.user?.email);
        toast.error("Email already exists");
        return;
      }
      toast.success("info Add Successfully");
    } else {
      toast.error("info add unsuccessfully");
    }
  };

  useMemo(() => {
    if (store) {
      if (store?.user?.user_type === "Social") {
        setValue("email", store?.user?.secondaryEmail);
      } else {
        setValue("email", store?.user?.email);
      }
      setValue("phoneNumber", store?.user?.phoneNumber);
      setValue("province", store?.company_address?.province);
      setValue("city", store?.company_address?.city);
      setValue("address", store?.company_address?.address);
      setValue("postal_code", store?.company_address?.postal_code);
    }
  }, [store]);
  return (
    <div className=" relative h-fit py-4">
      {isAuthor && (
        <button
          onClick={() => setIsEdit(!isEdit)}
          className="rounded-full p-2 bg-white hover:bg-pm border text-black 
            hover:text-pm absolute top-3 right-3 cursor-pointer w-fit"
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
      <form onSubmit={handleSubmit(handleEdit)}>
        <div className="row">
          {isAuthor && (
            <>
              <div className="col-12 col-md-6">
                <label>Email Address</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Email"
                  disabled={isEdit ? false : true}
                  readOnly={isEdit ? false : true}
                />
              </div>
              <div className="col-12 col-md-6">
                <label>Telephone No </label>
                <input
                  {...register("phoneNumber", { required: false })}
                  type="tel"
                  onInput={handlePhoneNumberInput}
                  placeholder="Phone Number"
                  disabled={isEdit ? false : true}
                  readOnly={isEdit ? false : true}
                />
              </div>
            </>
          )}
          <div className="col-12 col-md-6">
            <label>Province</label>
            <input
              {...register("province", { required: false })}
              type="text"
              placeholder="Province"
              disabled={isEdit ? false : true}
              readOnly={isEdit ? false : true}
            />
          </div>
          <div className="col-12 col-md-6">
            <label>City</label>
            <input
              {...register("city", { required: false })}
              type="text"
              onInput={handleAlphabeticInput}
              placeholder="City"
              disabled={isEdit ? false : true}
              readOnly={isEdit ? false : true}
            />
          </div>
          <div className="col-12 col-md-6">
            <label>Address</label>
            <input
              {...register("address", { required: false })}
              type="text"
              placeholder="Address"
              disabled={isEdit ? false : true}
              readOnly={isEdit ? false : true}
            />
          </div>
          <div className="col-12 col-md-6">
            <label>Postal code</label>
            <input
              {...register("postal_code", { required: false })}
              type="text"
              placeholder="Postal code "
              disabled={isEdit ? false : true}
              readOnly={isEdit ? false : true}
            />
          </div>
        </div>

        {isEdit && (
          <div className="flex justify-end items-center gap-4">
            <Button
              onClick={() => setIsEdit(false)}
              className="bg-red-600 text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-pm text-white flex justify-center items-center"
            >
              {loading ? (
                <Spinner color="white" className="font-bold" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SellerStoreInfo;
