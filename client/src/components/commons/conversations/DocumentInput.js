import {
  setDocument,
  setImage,
} from "@/redux/features/conversation/conversationSlice";
import {
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React, { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import EmojiInput from "./EmojiInput";
import { iAttach } from "@/utils/icons/icons";
import { ACCEPTABLE_ATTACH_FILE } from "@/lib/constants/globalConstant";

const DocumentInput = ({ sendMessage }) => {
  const { document } = useSelector((state) => state.conversation);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const docRef = useRef();
  const { handleSubmit, register, reset, setValue, watch } = useForm();
  const handleMessage = (data) => {
    sendMessage(data.message);
    reset();
    setOpen(false);
  };
  const setNewImoji = (input) => {
    const currentMessage = watch("message");
    setValue("message", currentMessage + input);
  };

  const handleDoc = (e) => {
    if (e) {
      dispatch(setDocument(e.target.files[0]));
      setOpen(true);
    } else {
      docRef.current.value = null;
    }
  };
  return (
    <>
      <Popover
        open={document && open}
        handler={() => {
          dispatch(setDocument(null));
          setOpen(false);
        }}
      >
        <PopoverHandler onClick={() => docRef.current.click()}>
          <div className="border-0 bg-transparent relative cursor-pointer min-w-[25px] hover:text-pm text-black flex justify-center items-center">
            {iAttach}
          </div>
        </PopoverHandler>
        <PopoverContent className="w-[300px] h-fit p-0 rounded z-[100000000000000]">
          {document && (
            <>
              <div className="p-2 min-h-[120px] flex justify-center items-center w-full">
                <div className="flex justify-between items-center gap-3 w-full h-[50px] border bg-pm/10 rounded-md border-pm overflow-hidden">
                  <div className="h-full w-[50px] flex justify-center items-center text-base font-bold text-red-600 bg-pm uppercase">
                    {document?.name?.split(".").pop().toLowerCase()}
                  </div>
                  <div className="flex flex-col gap-1 flex-grow">
                    <h1 className="oneLine text-black font-sm font-semibold">
                      {document?.name}
                    </h1>
                    <small className="text-xs text-gray-500">
                      Document file
                    </small>
                  </div>
                </div>
              </div>

              <div className="h-fit w-full bg-white">
                <form
                  onSubmit={handleSubmit(handleMessage)}
                  className="chatting_footer"
                >
                  <input
                    {...register("message", { required: false })}
                    className="w-100 border-0 bg-transparent p-3 border-top border-black"
                    type="text"
                    name="message"
                    placeholder="Caption (optional)"
                  />
                  <div className="d-flex justify-content-between p-3">
                    <div className="flex items-center w-fit gap-2">
                      <EmojiInput setImoji={setNewImoji} />
                    </div>

                    <button type="submit" className="border-0 bg-transparent">
                      <i className="fa-solid fa-paper-plane text-secondary"></i>
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>

      <input
        ref={docRef}
        onChange={(e) => handleDoc(e)}
        type="file"
        className="hidden"
        accept={ACCEPTABLE_ATTACH_FILE}
        multiple={false}
      />
    </>
  );
};

export default DocumentInput;
