import { usePatchUserInfoByIdMutation } from "@/redux/features/auth/authApi";
import { usePatchStoreInfoByIdMutation } from "@/redux/features/stores/storeApi";
import { Button, Spinner } from "@material-tailwind/react";
import moment from "moment/moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SteelManufacturer = ({
  store,
  isAuthor,
  company,
  holderName,
  joined_date,
}) => {
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

  return (
    <div className="w-full p-3 border rounded-md relative mb-4">
      {/* {
                isAuthor && <button onClick={() => setIsEdit(true)} className='rounded-full p-2 bg-white hover:bg-pm border text-black 
            hover:text-pm absolute top-3 right-3 cursor-pointer' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
            } */}

      <div className="max-w-[350px]">
        <h1 className="label leading-snug">{store?.store_name || company}</h1>
      </div>

      <div className="h-fit w-full">
        <div className="flex flex-col gap-2 label-list mt-4 max-w-[400px]">
          <div className="grid md:grid-cols-2 gap-2">
            <h1>Joined Turkeytrademarket</h1>
            <h1 className="font-bold">
              :{" "}
              {store?.joined_date
                ? moment(store?.joined_date).format("MMM DD YYYY")
                : moment(joined_date).format("MMM DD YYYY")}
            </h1>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            <h1>Account holder name</h1>
            <h1 className="font-bold break-all md:break-normal">
              : {holderName}
            </h1>
          </div>
        </div>
      </div>

      {/* {
                isEdit ? <form onSubmit={handleSubmit(handleEdit)} className='mt-6'>
                    <div className='grid md:grid-cols-1 gap-x-4'>
                        <div>
                            <label>Joined Turkeytrademarket</label>
                            <input
                                type='text'
                                placeholder='Joined Date'
                                defaultValue={moment(store?.joined_date).format("MM/DD/YYYY")}
                                readOnly
                                disabled
                                required={false}
                                className='cursor-none'
                            />
                        </div>
                        <div>
                            <label>Account holder name</label>
                            <input {...register("name", { required: true })}
                                type='text'
                                name='name'
                                placeholder='Account Holder Name'
                                defaultValue={store?.user?.name}
                                className=''
                            />
                        </div>
                    </div>
                    <div className='flex justify-end items-center gap-4'>
                        <Button onClick={() => setIsEdit(false)} className='bg-red-600 text-white'>Cancel</Button>
                        <Button type='submit'
                            disabled={isLoading}
                            className='bg-pm text-white flex justify-center items-center'
                        >
                            {
                                isLoading ? <Spinner color='white' className='font-bold' /> : "Submit"
                            }
                        </Button>
                    </div>
                </form> :

                    <div className='h-fit w-full'>
                        <div className='flex flex-col gap-2 label-list mt-4 max-w-[400px]'>
                            <div className='grid grid-cols-2 gap-2'>
                                <h1>Joined Turkeytrademarket</h1>
                                <h1 className='font-bold'>: {moment(store?.joined_date).format("MM/DD/YYYY")}</h1>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <h1>Account holder name</h1>
                                <h1 className='font-bold'>: {store?.user?.name}</h1>
                            </div>
                        </div>

                    </div>
            } */}
    </div>
  );
};

export default SteelManufacturer;
