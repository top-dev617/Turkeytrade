import { usePatchUserInfoByIdMutation } from "@/redux/features/auth/authApi";
import { usePatchStoreInfoByIdMutation } from "@/redux/features/stores/storeApi";
import { Button, Spinner } from "@material-tailwind/react";
import moment from "moment/moment";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const StoreInformation = ({ store, isAuthor }) => {
  const { handleSubmit, register, reset } = useForm();
  const [patchUserInfoById, { isLoading }] = usePatchUserInfoByIdMutation();
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = async (data) => {
    const options = {
      data: data,
      id: store?.user?._id,
    };
    const result = await patchUserInfoById(options);
    setIsEdit(false);
    if (result?.data?.status === true) {
      reset();
      toast.success("info Add Successfully");
    } else {
      toast.error("info add unsuccessfully");
    }
  };

  const isTrue =
    store?.user?.company_name ||
    store?.user?.number_of_employees ||
    store?.user?.business_type ||
    store?.user?.website ||
    store?.user?.year_established;

  //   console.log(isTrue ? true : false);

  return (
    <div
      className={`w-full p-3 border rounded-md relative my-4
      ${!isAuthor && !isTrue ? "hidden" : "block"}
        `}
    >
      {isAuthor && (
        <button
          onClick={() => setIsEdit(true)}
          className="rounded-full p-2 hover:bg-pm border text-black 
            hover:text-pm absolute top-3 right-3 cursor-pointer"
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

      <div className="max-w-[350px]">
        <h1 className="label">Company information</h1>
      </div>

      {isEdit ? (
        <form onSubmit={handleSubmit(handleEdit)} className="mt-6">
          <div className="grid md:grid-cols-2 gap-x-4">
            <div>
              <label>Company Name</label>
              <input
                {...register("company_name", { required: true })}
                type="text"
                name="company_name"
                placeholder="Company Name"
                defaultValue={store?.user?.company_name}
                className=""
              />
            </div>
            <div>
              <label>Number of employees</label>
              <input
                {...register("number_of_employees", { required: true })}
                type="number"
                min={0}
                name="number_of_employees"
                placeholder="Number of employees"
                defaultValue={store?.user?.number_of_employees}
                className=""
              />
            </div>
            <div>
              <label>Business Type</label>
              <input
                {...register("business_type", { required: true })}
                type="text"
                name="business_type"
                placeholder="Business Type"
                defaultValue={store?.user?.business_type}
                className=""
              />
            </div>
            <div>
              <label>Year Established</label>
              <input
                {...register("year_established", { required: true })}
                type="text"
                name="year_established"
                placeholder="Year Established"
                defaultValue={store?.user?.year_established}
                className=""
              />
            </div>
            <div>
              <label>Website URL</label>
              <input
                {...register("website", { required: true })}
                type="url"
                name="website"
                placeholder="Ex: https://website.com"
                defaultValue={store?.user?.website}
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
        <div className="h-fit w-full">
          <div className="flex flex-col gap-2 label-list mt-4 max-w-[400px]">
            <div className="grid grid-cols-2 gap-2">
              <h1>Company name</h1>
              <h1 className="font-bold">: {store?.user?.company_name}</h1>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <h1>Number of employees</h1>
              <h1 className="font-bold">
                : {store?.user?.number_of_employees}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <h1>Business Type</h1>
              <h1 className="font-bold">: {store?.user?.business_type}</h1>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <h1>Year Established</h1>
              <h1 className="font-bold">: {store?.user?.year_established}</h1>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <h1>Website URL</h1>
              <a
                target="_blank"
                href={store?.user?.website}
                className="font-bold"
              >
                : {store?.user?.website}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default StoreInformation;
