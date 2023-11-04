import { usePatchUserInfoByIdMutation } from "@/redux/features/auth/authApi";
import { usePatchStoreInfoByIdMutation } from "@/redux/features/stores/storeApi";
import { Button, Spinner } from "@material-tailwind/react";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SellerStoreInfo = ({ store, isAuthor }) => {
  const { handleSubmit, register, reset } = useForm();
  const [patchUserInfoById, { isLoading }] = usePatchUserInfoByIdMutation();
  const [patchStoreInfoById] = usePatchStoreInfoByIdMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUserUpdate = async (data) => {
    const options = {
      data: { email: data?.email, phoneNumber: data?.phoneNumber },
      id: store?.user?._id,
    };
    await patchUserInfoById(options);
    setLoading(false);
    setIsEdit(false);
  };

  const handleEdit = async (data) => {
    setLoading(true);
    handleUserUpdate(data);
    const options = {
      data: {
        company_address: {
          province: data?.province,
          city: data?.city,
          address: data?.address,
          postal_code: data?.postal_code,
        },
      },
      id: store?._id,
    };
    const result = await patchStoreInfoById(options);
    setLoading(false);
    if (result?.data?.status === true) {
      reset();
      toast.success("info Add Successfully");
    } else {
      toast.error("info add unsuccessfully");
    }
  };
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
            class="w-6 h-6"
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
                  {...register("email", { required: false })}
                  type="email"
                  name="email"
                  placeholder="Email"
                  disabled={isEdit ? false : true}
                  readOnly={isEdit ? false : true}
                  defaultValue={store?.user?.email}
                />
              </div>
              <div className="col-12 col-md-6">
                <label>Telephone No </label>
                <input
                  {...register("phoneNumber", { required: false })}
                  name="phoneNumber"
                  type="tel"
                  placeholder="123456789 "
                  disabled={isEdit ? false : true}
                  readOnly={isEdit ? false : true}
                  defaultValue={store?.user?.phoneNumber}
                />
              </div>
            </>
          )}
          <div className="col-12 col-md-6">
            <label>Province</label>
            <input
              {...register("province", { required: false })}
              name="province"
              type="text"
              placeholder="Kronoberg "
              disabled={isEdit ? false : true}
              readOnly={isEdit ? false : true}
              defaultValue={store?.company_address?.province}
            />
          </div>
          <div className="col-12 col-md-6">
            <label>City</label>
            <input
              {...register("city", { required: false })}
              name="city"
              type="text"
              placeholder="Stockholm "
              disabled={isEdit ? false : true}
              readOnly={isEdit ? false : true}
              defaultValue={store?.company_address?.city}
            />
          </div>
          <div className="col-12 col-md-6">
            <label>Address</label>
            <input
              {...register("address", { required: false })}
              name="address"
              type="text"
              placeholder="Storgatan29 "
              disabled={isEdit ? false : true}
              readOnly={isEdit ? false : true}
              defaultValue={store?.company_address?.address}
            />
          </div>
          <div className="col-12 col-md-6">
            <label>Postal code</label>
            <input
              {...register("postal_code", { required: false })}
              name="postal_code"
              type="number"
              placeholder="36258 "
              disabled={isEdit ? false : true}
              readOnly={isEdit ? false : true}
              defaultValue={store?.company_address?.postal_code}
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
