import { setImage } from "@/redux/features/conversation/conversationSlice";
import {
  Button,
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

const ImageInput = ({ sendMessage }) => {
  const { image } = useSelector((state) => state.conversation);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const imgRef = useRef();
  const { handleSubmit, register, reset, setValue } = useForm();
  const handleMessage = (data) => {
    sendMessage(data.message);
    reset();
    setOpen(false);
  };
  const setNewImoji = (input) => {
    setValue("message", input);
  };
  return (
    <>
      <Popover open={!!image && open} handler={() => dispatch(setOpen(false))}>
        <PopoverHandler>
          <Button className="opacity-0 absolute bottom-0 w-1"></Button>
        </PopoverHandler>
        <PopoverContent className="max-w-[300px] p-0 rounded z-[100000000000000]">
          {image && (
            <>
              <div className="w-full h-full max-h-[300px]">
                <img
                  className="w-full h-full"
                  loading="lazy"
                  src={URL.createObjectURL(image)}
                />
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
                      <div
                        onClick={() => imgRef.current.click()}
                        className="border-0 bg-transparent relative cursor-pointer"
                      >
                        <i className="fa-solid fa-image text-secondary hover:text-pm"></i>
                      </div>
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

      <div
        onClick={() => imgRef.current.click()}
        className="border-0 bg-transparent relative cursor-pointer"
      >
        <i className="fa-solid fa-image text-secondary hover:text-pm"></i>
      </div>

      <input
        ref={imgRef}
        onChange={(e) => {
          dispatch(setImage(e.target.files[0]));
          setOpen(true);
        }}
        type="file"
        className="hidden"
        accept=".png, .jpeg, .jpg"
        multiple={false}
      />
    </>
  );
};

export default ImageInput;
