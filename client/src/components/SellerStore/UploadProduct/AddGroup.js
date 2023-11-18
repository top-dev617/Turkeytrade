import { usePostProductGroupMutation } from "@/redux/features/product-group/productGroupApi";
import { Button, PopoverContent, Spinner } from "@material-tailwind/react";
import React from "react";
import { useRef } from "react";
import { useState } from "react";

const AddGroup = ({ groups, storeId }) => {
  const [postProductGroup, { isLoading }] = usePostProductGroupMutation();
  const [groupTitle, setGroupTitle] = useState("");
  const groupRef = useRef();

  const handleAddNewGroup = async () => {
    if (groupTitle) {
      const options = {
        data: { title: groupTitle, store: storeId },
      };
      const result = await postProductGroup(options);
      if (result) {
        setGroupTitle("");
        groupRef.current.value = "";
      }
    }
  };

  return (
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
              <Button className="h-10 w-full flex justify-between items-center rounded bg-white border shadow-none px-1">
                <small className="text-sm text-gray-900">{g?.title}</small>
                <div className="cursor-pointer w-6 h-6 bg-pm hover:bg-pmd text-white p-1 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>
    </PopoverContent>
  );
};

export default AddGroup;
