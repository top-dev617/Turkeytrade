import FileExtInfoDialog from "@/components/commons/dialogs/FileExtInfoDialog";
import VideoPlayer from "@/components/commons/video-player/VideoPlayer";
import { ACCEPTABLE_VIDEO_FILE } from "@/lib/constants/globalConstant";
import useViewVideo from "@/lib/hooks/useViewVideo";
import { trash } from "@/utils/datas/icons";
import { iUpload } from "@/utils/icons/icons";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

const StoreVideoInputInStepper = ({ setVideo, video }) => {
  const { viewVideo } = useViewVideo();
  const videoRef = useRef();

  const [open, setOpen] = useState(null);

  const onVideo = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      if (
        file.name.split(".").pop().toLowerCase().includes("webm") ||
        file.name.split(".").pop().toLowerCase().includes("mp4")
      ) {
        if (file?.size > 200 * 1024 * 1024) {
          videoRef.current.value = null;
          setOpen("File size must be 200 MB or less.");
          return;
        } else {
          setVideo(file);
        }
      } else {
        setOpen(
          "This file is not supported. Please upload videos in MP4 or Webm format."
        );
      }
    } else if (acceptedFiles.length > 1) {
      setOpen("Please upload only one video file.");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onVideo,
    multiple: false,
    // accept: {
    //   "video/*": [".mp4", ".webm"],
    // },
  });
  return (
    <>
      <div>
        <h1 className="font-inter font-semibold text-[18px] md:text-[25px] md:leading-[32px] text-[#000000] text-center">
          Upload a video or slideshow of your company or factory
        </h1>
        <div className="relative w-full h-fit">
          {video && (
            <div
              onClick={() => setVideo(null)}
              className="absolute -top-4 -right-4 w-[40px] bg-red-600 rounded-full p-[8px] text-white cursor-pointer z-50"
            >
              {trash}
            </div>
          )}
          <div
            {...getRootProps()}
            className="flex flex-col justify-center items-center border-[2px] border-dashed border-spacing-[32px] rounded-[20px] border-[#000000] h-[250px] md:h-[343px] max-h-[250px] md:max-h-[343px] !mt-5 md:!mt-[44px] mb-4 lg:!mb-[35px] relative overflow-hidden"
          >
            {video ? (
              <>
                <VideoPlayer
                  url={viewVideo(video)}
                  className="object-contain w-full h-full block relative"
                />
              </>
            ) : (
              <>
                <div>{iUpload}</div>
                <h1 className="mt-[15px] font-inter font-medium text-[18px] md:text-[26px] md:leading-[32px] text-[#000000] text-center">
                  Choose a file or drag & drop here
                </h1>
                <p className="mt-1 md:mt-[12px] font-inter font-medium text-[12px] md:text-[16px] lg:text-[18px] leading-[22px] text-[#9F9F9F] text-center">
                  MP4, WebM format - Maximum 200 MB
                </p>
                <button
                  type="button"
                  className="mt-[30px] w-[150px] md:w-[207px] h-[35px] md:h-[60px] bg-[#037D41] rounded md:!rounded-[5px] font-inter font-medium text-[14px] md:text-[22px] text-white"
                >
                  Browse file
                </button>
              </>
            )}
          </div>
        </div>

        <input
          {...getInputProps()}
          ref={videoRef}
          type="file"
          multiple={false}
          accept={ACCEPTABLE_VIDEO_FILE}
          onChange={(e) => setVideo(e.target.files[0])}
          className="hidden"
        />
      </div>
      <FileExtInfoDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default StoreVideoInputInStepper;
