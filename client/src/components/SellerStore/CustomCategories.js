import { useGetStoreCategoriesQuery } from "@/redux/features/stores/storeApi";
import Link from "next/link";
import arrow from "../../../public/assets/arrow.png";
import React, { useState } from "react";
import Loading from "../commons/Loading";
import {
  useGetProductGroupByStoreIdQuery,
  useUpdateGroupByIdAndStoreMutation,
} from "@/redux/features/product-group/productGroupApi";
import { toast } from "react-toastify";
import { Button, Dialog } from "@material-tailwind/react";

const CustomCategories = ({ store }) => {
  const { data, isLoading } = useGetProductGroupByStoreIdQuery(store?._id);
  const [updateGroupByIdAndStore] = useUpdateGroupByIdAndStoreMutation();
  const [editCate, setEditCate] = useState(null);
  const [cateName, setCateName] = useState("");
  const [open, setOpen] = useState(false);

  const handleCate = async () => {
    setOpen(false);
    const options = {
      id: editCate?._id,
      storeId: store?._id,
      data: { title: cateName },
    };

    const result = await updateGroupByIdAndStore(options);
    if (result?.data?.success) {
      toast.success("Category Update Successfully");
    }
    setEditCate(null);
    setCateName("");
  };

  const handleCateControl = async () => {
    if (editCate?.isExist) {
      setOpen(true);
    } else {
      handleCate();
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="md:px-8 pb-8 min-h-[400px]">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h5 className="text-xl font-bold mb-2">Browse Categories</h5>

          <div className="grid md:grid-cols-3 gap-2 md:gap-4 mx-auto">
            {data?.data?.map((group, index) => (
              <div className="flex items-center">
                {editCate && editCate._id === group._id ? (
                  <input
                    onChange={(e) => setCateName(e.target.value)}
                    type="text"
                    defaultValue={editCate?.title}
                    placeholder="Write Category Name"
                    maxLength={25}
                    className="!bg-gray-200 shadow-none hover:bg-gray-300 !border !border-r-0  !border-pm focus:!border-pm rounded-sm duration-150 gap-5 h-10 w-full px-1 hover:text-gray-800 normal-case focus:!border outline-none focus:outline-none placeholder:text-sm"
                  />
                ) : (
                  <Link
                    href={`/group/${group?._id}`}
                    className="flex items-center justify-between bg-gray-200 shadow-none hover:bg-gray-300 rounded-sm duration-150 gap-5 h-10 w-full px-1 hover:text-gray-800 normal-case"
                    key={index}
                  >
                    <div className="flex items-center gap-5">
                      <p dangerouslySetInnerHTML={{ __html: group?.title }} />
                    </div>
                    <img src={arrow.src} alt="" />
                  </Link>
                )}

                {editCate && editCate._id === group._id ? (
                  <>
                    {cateName && editCate?.title !== cateName && (
                      <div
                        onClick={() => handleCateControl()}
                        className="h-10 w-10 !bg-pm hover:!bg-pmd cursor-pointer text-white flex justify-center items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          width={28}
                          height={20}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </div>
                    )}
                    <div
                      onClick={() => {
                        setEditCate(null);
                        setCateName("");
                      }}
                      className="h-10 w-10 !bg-red-600 hover:!bg-red-700 cursor-pointer text-white flex justify-center items-center"
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
                    </div>
                  </>
                ) : (
                  <div
                    onClick={() => setEditCate(group)}
                    className="h-10 w-10 !bg-pm hover:!bg-pmd cursor-pointer text-white flex justify-center items-center"
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
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {open && (
        <Dialog
          open={open}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
          size="xs"
          className="!bg-white opacity-100 p-4 shadow !shadow-pm border-[1px] border-pm"
        >
          <div className="bg-white pb-4">
            <p className="text-black font-medium leading-[18px] text-sm">
              <strong>Note:</strong> If you rename a custom category, the new
              name will be applied to all products currently assigned to this
              category.{" "}
              <p className="font-semibold">Are you sure you want to proceed?</p>
            </p>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              size="sm"
              onClick={() => handleCancel()}
              className="bg-red-600 hover:bg-red-700 text-white rounded"
            >
              <span>Cancel</span>
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => handleCate()}
              className="bg-pm hover:bg-pmd text-white rounded"
            >
              <span>Confirm</span>
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default CustomCategories;
