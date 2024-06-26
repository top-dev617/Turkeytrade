import useInputPattern from "@/lib/hooks/useInputPattern";
import { usePatchUserInfoByIdMutation } from "@/redux/features/auth/authApi";
import {
  usePatchStoreInfoByIdMutation,
  useStoreInfoUpdateMutation,
} from "@/redux/features/stores/storeApi";
import { business_types } from "@/utils/datas/globalData";
import { Button, Spinner } from "@material-tailwind/react";
import moment from "moment/moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const StoreInformation = ({ store, isAuthor, user }) => {
  const { handleNumber } = useInputPattern();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [storeInfoUpdate, { isLoading }] = useStoreInfoUpdateMutation();
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = async (data) => {
    const { store_name, ...business_information } = data;
    const options = {
      data: {
        store_name,
        business_information,
      },
      id: store?._id,
    };
    const result = await storeInfoUpdate(options);
    setIsEdit(false);
    if (result?.data?.status === true) {
      reset();
      toast.success("info added successfully");
    } else {
      toast.error("Info added Unsuccessfully");
    }
  };

  useEffect(() => {
    if (user?.role === "Buyer" && !store) {
      setValue("store_name", user?.company_name);
    }
  }, [store, user]);

  const isTrue =
    store?.store_name ||
    store?.business_information?.number_of_employees ||
    store?.business_information?.business_type ||
    store?.business_information?.website ||
    store?.business_information?.year_established;

  // console.log(store);

  //   console.log(isTrue ? true : false);   ${!isAuthor && !isTrue ? "hidden" : "block"}

  return (
    <div
      className={`w-full p-3 border rounded-md relative my-4
    
        `}
    >
      {isAuthor && (
        <>
          {isEdit ? (
            <button
              onClick={() => setIsEdit(!isEdit)}
              className="h-10 w-10 rounded border !bg-red-600 hover:!bg-red-700 text-white flex justify-center items-center absolute top-3 right-3 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="22"
                stroke="3"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(!isEdit)}
              className="h-10 w-10 rounded border !bg-white hover:!bg-pmd text-black hover:!text-white flex justify-center items-center absolute top-3 right-3 cursor-pointer"
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
            </button>
          )}
        </>
      )}

      <div className="max-w-[350px]">
        <h1 className="label">Company information</h1>
      </div>

      {isEdit ? (
        <form onSubmit={handleSubmit(handleEdit)} className="mt-6">
          <div className="grid md:grid-cols-2 gap-x-4">
            <div>
              <label>Company Name</label>
              <input
                {...register("store_name", { required: true })}
                type="text"
                name="store_name"
                placeholder="Company Name"
                defaultValue={store?.store_name}
                className=""
              />
            </div>
            <div>
              <label>Number of employees</label>
              <input
                {...register("number_of_employees", { required: true })}
                type="number"
                min={0}
                required
                name="number_of_employees"
                placeholder="Number of employees"
                defaultValue={store?.business_information?.number_of_employees}
                className=""
              />
            </div>
            <div>
              <label>Business Type</label>
              <select
                {...register("business_type", { required: true })}
                aria-label="Default select example"
                className={`px-2 !py-[18px] input`}
                required
              >
                <option value="" style={{ color: "#94959B" }}>
                  Business Type
                </option>
                {business_types?.map((item) => (
                  <option
                    value={item}
                    selected={
                      store?.business_information?.business_type === item
                    }
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Year Established</label>
              <input
                {...register("year_established", { required: true })}
                type="text"
                name="year_established"
                onInput={handleNumber}
                required
                placeholder="Year Established"
                defaultValue={store?.business_information?.year_established}
                className=""
              />
            </div>
            <div>
              <label>Website URL</label>
              <input
                {...register("company_website", { required: false })}
                type="url"
                name="company_website"
                placeholder="Ex: https://website.com"
                defaultValue={store?.business_information?.company_website}
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
            {store && (
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
            )}
          </div>
        </form>
      ) : (
        <div className="h-fit w-full">
          <div className="flex flex-col gap-2 label-list mt-4 max-w-[400px]">
            <div className="grid md:grid-cols-2 gap-2">
              <h1>Company name</h1>
              <h1 className="font-bold">
                : {store?.store_name || user?.company_name}
              </h1>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              <h1>Number of employees</h1>
              <h1 className="font-bold">
                : {store?.business_information?.number_of_employees}
              </h1>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              <h1>Business Type</h1>
              <h1 className="font-bold">
                : {store?.business_information?.business_type}
              </h1>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              <h1>Year Established</h1>
              <h1 className="font-bold">
                : {store?.business_information?.year_established}
              </h1>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              <h1>Company Website</h1>
              <div>
                :
                <a
                  target="_blank"
                  href={store?.business_information?.company_website}
                  className="font-bold inline ps-1 break-all md:break-normal"
                >
                  {store?.business_information?.company_website}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default StoreInformation;
