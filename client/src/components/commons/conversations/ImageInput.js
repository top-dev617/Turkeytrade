import { setImages } from "@/redux/features/conversation/conversationSlice";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React, { useMemo, useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import EmojiInput from "./EmojiInput";
import { ACCEPTABLE_IMAGE_FILE } from "@/lib/constants/globalConstant";
import useViewImage from "@/lib/hooks/useViewImage";
import { toast } from "react-toastify";

const ImageInput = ({ sendMessage, pastImage, resetImage }) => {
  const { images } = useSelector((state) => state.conversation);
  const { viewImg } = useViewImage();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const imgRef = useRef();
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

  const handleSetImages = (e) => {
    const files = e.target.files;
    if (files.length > 3) {
      toast.error(`Please select up to ${3} files.`);
      imgRef.current.value = null;
      return;
    } else {
      dispatch(setImages([...files]));
      setOpen(true);
    }
  };

  useMemo(() => {
    if (pastImage) {
      dispatch(setImages([pastImage]));
      setOpen(true);
      resetImage(null);
    }
  }, [pastImage]);
  return (
    <>
      <Popover
        open={open}
        handler={() => {
          dispatch(setImages([]));
          setOpen(false);
        }}
      >
        <PopoverHandler onClick={() => imgRef.current.click()}>
          <div className="border-0 bg-transparent relative cursor-pointer">
            <i className="fa-solid fa-image text-secondary hover:text-pm"></i>
          </div>
        </PopoverHandler>
        <PopoverContent className="w-[300px] p-0 rounded z-[100000000000000]">
          {Array.isArray(images) && (
            <>
              <div
                className={`w-full max-h-[300px] grid ${
                  images?.length === 1 ? "grid-cols-1" : "grid-cols-2"
                } gap-2 p-2`}
              >
                {images?.map((img, index) => (
                  <img
                    key={index}
                    className="w-full h-full max-h-[200px] object-contain"
                    loading="lazy"
                    src={viewImg(img)}
                  />
                ))}
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
        ref={imgRef}
        onChange={(e) => handleSetImages(e)}
        type="file"
        className="hidden"
        max={3}
        multiple={true}
        accept={ACCEPTABLE_IMAGE_FILE}
      />
    </>
  );
};

export default ImageInput;
