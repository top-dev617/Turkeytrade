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

const AddGroup = ({ groups, storeId, setValue }) => {
  const [postProductGroup, { isLoading }] = usePostProductGroupMutation();
  const [postIsExistGroup] = usePostIsExistGroupMutation();
  const [removeGroupById, { deleteLoading }] = useRemoveGroupByIdMutation();
  const [groupTitle, setGroupTitle] = useState("");
  const groupRef = useRef();
  const [open, setOpen] = useState(null);

  const handleAddNewGroup = async () => {
    if (groupTitle) {
      const options = {
        data: { title: groupTitle, store: storeId },
      };
      const result = await postProductGroup(options);
      if (result) {
        setGroupTitle("");
        groupRef.current.value = "";
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
      console.log(result);
      if (result) {
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

  return (
    <>
      <PopoverContent className="w-72 p-2 z-50">
        <div className="max-w-[400px]">
          <label>
            New Category{" "}
            <small className="italic text-xs text-pmd">
              (Maximum 25 Characters)
            </small>
          </label>
          <input
            onChange={(e) => setGroupTitle(e.target.value)}
            type="text"
            maxLength={25}
            ref={groupRef}
            className="w-full h-14 px-4 !border border-pm mt-1"
            placeholder="Enter Category Name"
          />
          <Button
            onClick={() => handleAddNewGroup()}
            disabled={isLoading || !groupTitle}
            className="bg-pm hover:bg-pmd text-white mt-2 w-full flex justify-center items-center"
          >
            {isLoading ? <Spinner color="white" /> : "Create"}
          </Button>

          {groups?.length > 0 && (
            <div className="grid grid-cols-1 gap-1 mt-2 p-1 text-gray-900 cursor-pointer max-h-[200px] overflow-y-auto">
              {groups.map((g, i) => (
                <Button
                  key={i}
                  className="h-10 w-full flex justify-between items-center rounded bg-white border shadow-none px-1"
                >
                  <small className="text-sm text-gray-900">{g?.title}</small>

                  <Popover
                    open={open?._id === g?._id && !open?.isExist}
                    handler={() => setOpen(null)}
                    placement="bottom"
                  >
                    <PopoverHandler onClick={() => handleCheckExist(g)}>
                      <div className="cursor-pointer w-6 h-6 bg-white text-red-600 hover:!bg-red-600 hover:text-white p-1 rounded">
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
                </Button>
              ))}
            </div>
          )}
        </div>
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
