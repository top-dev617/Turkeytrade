import VideoPlayer from "@/components/commons/video-player/VideoPlayer";
import { base_url } from "@/utils/auth/global";
import { trash } from "@/utils/datas/icons";
import React, { useCallback, useState } from "react";
import videoIcon from "../../../../public/assets/vedio-icon.png";
import { useDropzone } from "react-dropzone";
import { ACCEPTABLE_VIDEO_FILE } from "@/lib/constants/globalConstant";
import FileExtInfoDialog from "@/components/commons/dialogs/FileExtInfoDialog";

const CompanyVideoInput = ({
  isEdit,
  removeVideo,
  store,
  storeVideo,
  video,
  viewFile,
  videoRef,
  handleVideo,
}) => {
  const [open, setOpen] = useState(null);

  const onVideo = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      if ([".mp4", ".webm"].includes(file.name.slice(-4).toLowerCase())) {
        handleVideo(file);
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
    accept: {
      "video/*": [".mp4", ".webm"],
    },
  });
  return (
    <>
      <div
        className={`input_box_video relative block w-full md:h-[320px] max-h-[320px] ${
          !isEdit && "!bg-white"
        }`}
      >
        {isEdit && (
          <div
            onClick={() => removeVideo()}
            className="absolute -top-2 -right-2 z-50 rounded-full bg-white text-red-600 p-1 w-8 cursor-pointer"
          >
            {trash}
          </div>
        )}

        {store?.data?.store_presentation_video && storeVideo && !video ? (
          <VideoPlayer
            url={`${base_url}/uploads/${store?.data?.store_presentation_video}`}
            playing={false}
            className="object-contain w-full h-full block relative"
          />
        ) : (
          <>
            {video ? (
              <VideoPlayer
                url={viewFile(video)}
                playing={false}
                className="object-contain w-full h-full block relative"
              />
            ) : (
              <>
                {isEdit ? (
                  <div
                    {...getRootProps()}
                    onClick={() => videoRef.current.click()}
                    className="input_inner h-full w-full cursor-pointer"
                  >
                    <img src={videoIcon.src} alt="" />
                    <p>Drop your video here or browse</p>
                  </div>
                ) : (
                  <div className="input_inner h-full w-full cursor-pointer">
                    <img src={videoIcon.src} alt="" />
                    <p>Drop your video here or browse</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
        <input
          {...getInputProps()}
          ref={videoRef}
          type="file"
          multiple={false}
          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full opacity-0 cursor-pointer"
          accept={ACCEPTABLE_VIDEO_FILE}
          disabled={isEdit ? false : true}
        />
      </div>

      <FileExtInfoDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default CompanyVideoInput;
