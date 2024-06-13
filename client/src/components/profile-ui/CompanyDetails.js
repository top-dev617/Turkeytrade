import { AuthContext } from "@/components/context/AuthContext";
import { useGetStoreInfoBySellerIdQuery } from "@/redux/features/stores/storeApi";
import React, { useContext, useMemo } from "react";
import {
  usePatchUserInfoByIdMutation,
  useUpdateUserInfoWithEmailMutation,
} from "@/redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import StoreInformation from "../SellerStore/ContactInfo/StoreInformation";
import useInputPattern from "@/lib/hooks/useInputPattern";
import SteelManufacturer from "../SellerStore/ContactInfo/SteelManufacturer";
import EmailChangeModal from "./EmailChangeModal";

const CompanyDetails = () => {
  const { handleSubmit, register, reset, setValue } = useForm();
  const { setUser, user } = useContext(AuthContext);
  const { data } = useGetStoreInfoBySellerIdQuery(user?._id);
  const { handlePhoneNumberInput } = useInputPattern();

  const [updateUserInfoWithEmail, { isLoading }] =
    useUpdateUserInfoWithEmailMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  const handleEdit = async (data) => {
    const options = {
      data: data,
      id: user?._id,
    };
    const result = await updateUserInfoWithEmail(options);
    setIsEdit(false);
    if (result?.data?.status === true) {
      if (result?.data?.emailExist) {
        toast.error("Email already exists");
        setValue("email", user?.email);
        return;
      }
      setUser(result?.data?.data);
      toast.success("Info added successfully");
    } else {
      toast.error("Info added Unsuccessfully");
    }
  };

  useMemo(() => {
    if (user) {
      if (user?.user_type === "Social") {
        setValue("email", user?.secondaryEmail);
      } else {
        setValue("email", user?.email);
      }
      setValue("phoneNumber", user?.phoneNumber);
      setValue("province", user?.province);
      setValue("city", user?.city);
      setValue("companyAddress", user?.companyAddress);
      setValue("zipCode", user?.zipCode);
    }
  }, [user]);

  // console.log(user);

  return (
    <div className="contact_info !px-0 md:!px-4">
      <SteelManufacturer
        store={data?.data}
        isAuthor={user?._id === data?.data?.user?._id ? true : false}
        company={user?.company_name}
        holderName={user?.name}
        joined_date={user?.createdAt}
      />
      <div className=" relative h-fit py-4">
        <button
          onClick={() => setIsEdit(!isEdit)}
          className="rounded-full p-2 bg-white hover:!bg-pm border hover:!text-white text-black absolute top-3 right-3 cursor-pointer w-fit"
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
        <form onSubmit={handleSubmit(handleEdit)}>
          <div className="row">
            <div className="col-12 col-md-6">
              <label>Email Address</label>
              <div className="relative">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Email"
                  disabled={isEdit ? false : true}
                  readOnly={isEdit ? false : true}
                  className="flex-grow w-full !max-h-[61px]"
                />

                <div
                  onClick={() => setEditEmail(!editEmail)}
                  className="absolute top-2.5 right-2 h-10 w-10 rounded border !bg-white hover:!bg-pmd cursor-pointer text-black hover:!text-white flex justify-center items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <label>Telephone No </label>
              <input
                {...register("phoneNumber", { required: false })}
                type="tel"
                onInput={handlePhoneNumberInput}
                placeholder="Phone Number"
                readOnly={isEdit ? false : true}
              />
            </div>
            <div className="col-12 col-md-6">
              <label>Province</label>
              <input
                {...register("province", { required: false })}
                type="text"
                placeholder="Province"
                readOnly={isEdit ? false : true}
              />
            </div>
            <div className="col-12 col-md-6">
              <label>City</label>
              <input
                {...register("city", { required: false })}
                type="text"
                placeholder="City"
                readOnly={isEdit ? false : true}
              />
            </div>
            <div className="col-12 col-md-6">
              <label>Address</label>
              <input
                {...register("companyAddress", { required: false })}
                type="text"
                placeholder="Company Address"
                readOnly={isEdit ? false : true}
              />
            </div>
            <div className="col-12 col-md-6">
              <label>Postal code</label>
              <input
                {...register("zipCode", { required: false })}
                type="text"
                placeholder="Zip Code / Postal Code"
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
          )}
        </form>
      </div>
      <StoreInformation store={data?.data} isAuthor={true} user={user} />
      <EmailChangeModal open={editEmail} onClose={setEditEmail} />
    </div>
  );
};

export default CompanyDetails;
