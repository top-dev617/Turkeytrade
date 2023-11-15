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
        <label>New group</label>
        <input
          onChange={(e) => setGroupTitle(e.target.value)}
          type="text"
          ref={groupRef}
          className="w-full h-14 px-4 !border border-pm"
          placeholder="Enter Your Group Name"
        />
        <Button
          onClick={() => handleAddNewGroup()}
          disabled={isLoading || !groupTitle}
          className="bg-pm hover:bg-pmd text-white mt-2 w-full flex justify-center items-center"
        >
          {isLoading ? <Spinner color="white" /> : "Create"}
        </Button>

        {groups?.length > 0 && (
          <div className="grid grid-cols-1 gap-1 mt-2 bg-green-100 p-1 text-gray-900 cursor-pointer">
            {groups.map((g, i) => (
              <small className="text-sm">{g?.title}</small>
            ))}
          </div>
        )}
      </div>
    </PopoverContent>
  );
};

export default AddGroup;
