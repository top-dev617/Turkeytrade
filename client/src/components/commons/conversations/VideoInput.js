import { setVideo } from "@/redux/features/conversation/conversationSlice";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React, { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import EmojiInput from "./EmojiInput";
import { iVideo } from "@/utils/icons/icons";
import { ACCEPTABLE_VIDEO_FILE } from "@/lib/constants/globalConstant";
import { toast } from "react-toastify";
import VideoPlayer from "../video-player/VideoPlayer";
import useViewVideo from "@/lib/hooks/useViewVideo";

const VideoInput = ({ sendMessage }) => {
  const { video } = useSelector((state) => state.conversation);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const videoRef = useRef();
  const { viewVideo } = useViewVideo();
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

  const handleVideo = (file) => {
    if (file) {
      if (file.size > 200 * 1024 * 1024) {
        toast.error("File size must be 200 MB or less.");
        videoRef.current.value = null;
        return;
      } else {
        console.log(file);
        dispatch(setVideo(file));
        setOpen(true);
      }
    } else {
      videoRef.current.value = null;
      return;
    }
  };
  return (
    <>
      <Popover
        open={video && open}
        handler={() => {
          dispatch(setVideo(null));
          setOpen(false);
        }}
      >
        <PopoverHandler onClick={() => videoRef.current.click()}>
          <div className="border-0 bg-transparent relative cursor-pointer min-w-[25px] hover:text-pm text-black flex justify-center items-center">
            {iVideo}
          </div>
        </PopoverHandler>
        <PopoverContent className="w-[300px] h-fit p-0 rounded z-[100000000000000]">
          {video && (
            <>
              <div className="p-2 min-h-[200px] max-h-[200px] w-full">
                <VideoPlayer
                  url={viewVideo(video)}
                  className="object-contain w-100 h-100"
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
        ref={videoRef}
        onChange={(e) => handleVideo(e.target.files[0])}
        type="file"
        className="hidden"
        accept={ACCEPTABLE_VIDEO_FILE}
        multiple={false}
      />
    </>
  );
};

export default VideoInput;
