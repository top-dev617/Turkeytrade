import {
  usePostIsExistGroupMutation,
  usePostProductGroupMutation,
  useRemoveGroupByIdMutation,
} from "@/redux/features/product-group/productGroupApi";
import { trash } from "@/utils/datas/icons";
import {
  Button,
  Dialog,
  Popover,
  PopoverContent,
  PopoverHandler,
  Spinner,
} from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddGroup = ({ groups, storeId, setValue, groupValue }) => {
  const [postProductGroup, { isLoading }] = usePostProductGroupMutation();
  const [postIsExistGroup] = usePostIsExistGroupMutation();
  const [removeGroupById, { deleteLoading }] = useRemoveGroupByIdMutation();
  const [open, setOpen] = useState(null);

  const { handleSubmit, register, reset, watch } = useForm();

  const handleAddNewGroup = async (data) => {
    if (data) {
      const options = {
        data: { title: data?.title, store: storeId },
      };
      const result = await postProductGroup(options);
      if (result) {
        reset();
        if (result?.data?.status) {
          setValue("group", result?.data?.data?._id);
        }
      }
    }
  };
  const handleDeleteGroup = async (id) => {
    if (open) {
      const options = {
        id: id,
        data: null,
      };
      const result = await removeGroupById(options);
      // console.log(result);
      if (result) {
        if (groupValue === id) {
          setValue("group", "");
        }
        setOpen(null);
      }
    }
  };

  const handleCheckExist = async (group) => {
    const options = {
      id: group?._id,
    };
    const result = await postIsExistGroup(options);
    if (result?.data?.isExist) {
      setOpen({ isExist: true, _id: group?._id });
    } else {
      setOpen({ isExist: false, _id: group?._id });
    }
  };

  const checkKeyDownAction = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddNewGroup({ title: watch("title") });
    }
  };

  return (
    <>
      <PopoverContent className="w-72 p-2 z-50">
        <form
          onKeyDown={checkKeyDownAction}
          onSubmit={handleSubmit(handleAddNewGroup)}
          className="max-w-[400px]"
        >
          <label>
            New Category{" "}
            <small className="italic text-xs text-pmd">
              (Maximum 25 Characters)
            </small>
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            maxLength={25}
            // ref={groupRef}
            className="w-full h-14 px-4 !border border-pm mt-1"
            placeholder="Enter Category Name"
          />
          <Button
            type="button"
            onClick={() => handleAddNewGroup({ title: watch("title") })}
            disabled={isLoading || !watch("title")}
            className="bg-pm hover:bg-pmd text-white mt-2 w-full flex justify-center items-center cursor-pointer"
          >
            {isLoading ? <Spinner color="white" /> : "Create"}
          </Button>

          {groups?.length > 0 && (
            <div className="grid grid-cols-1 gap-1 mt-2 p-1 text-gray-900 cursor-pointer max-h-[200px] h-full overflow-y-auto">
              {groups.map((g, i) => (
                <div className="h-10 max-h-[40px] w-full flex items-center justify-between border rounded-sm text-black hover:!bg-pm bg-white hover:!text-white px-1">
                  <Button
                    type="button"
                    key={i}
                    onClick={() => setValue("group", g?._id)}
                    className="bg-transparent text-current flex justify-between items-center flex-grow shadow-none normal-case px-0"
                  >
                    <small className="text-sm">{g?.title}</small>
                  </Button>
                  <Popover
                    open={open?._id === g?._id && !open?.isExist}
                    handler={() => setOpen(null)}
                    placement="bottom"
                  >
                    <PopoverHandler onClick={() => handleCheckExist(g)}>
                      <div className="cursor-pointer w-6 h-6 bg-white text-red-600 hover:!bg-red-600 hover:text-white p-1 rounded z-50">
                        {trash}
                      </div>
                    </PopoverHandler>
                    <PopoverContent className="w-44 !z-[99999999]">
                      <div className="max-w-[200px] text-center">
                        <div>
                          <p className="text-red-400">
                            are you sure you want to delete this?
                          </p>
                          <Button
                            type="button"
                            onClick={() => handleDeleteGroup(open?._id)}
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white mt-2"
                          >
                            {deleteLoading ? <Spinner /> : "Delete"}
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
          )}
        </form>
      </PopoverContent>

      <Dialog
        open={open?.isExist ? true : false}
        handler={() => setOpen(null)}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xs"
        className="!bg-white opacity-100 p-4 shadow !shadow-pm border-[1px] border-pm"
      >
        <div className="bg-white pb-4">
          <p className="text-black font-medium leading-[18px] text-sm">
            This custom category cannot be removed as it has products linked to
            it. To modify the Custom category for your products, please go to
            'Edit Product' on your{" "}
            <Link
              className="text-pm underline"
              href="/mystore"
              onClick={() => setOpen(null)}
            >
              My store
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-end">
          <Button
            type="button"
            size="sm"
            onClick={() => setOpen(null)}
            className="bg-red-600 hover:bg-red-700 text-white rounded"
          >
            <span>Cancel</span>
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default AddGroup;
