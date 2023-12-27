import VideoPlayer from "@/components/commons/video-player/VideoPlayer";
import { base_url } from "@/utils/auth/global";
import { trash } from "@/utils/datas/icons";
import React, { useCallback } from "react";
import videoIcon from "../../../../public/assets/vedio-icon.png";
import { useDropzone } from "react-dropzone";

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
  const onVideo = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      handleVideo(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onVideo,
    multiple: false,
    accept: {
      "video/*": [".mp4", ".mkv"],
    },
  });
  return (
    <div className={`input_box relative ${!isEdit && "!bg-white"}`}>
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
          className="object-contain w-100 h-100"
        />
      ) : (
        <>
          {video ? (
            <VideoPlayer
              url={viewFile(video)}
              className="object-contain w-100 h-100"
            />
          ) : (
            <>
              {isEdit ? (
                <div {...getRootProps()} className="input_inner">
                  <img src={videoIcon.src} alt="" />
                  <p>Drop your video here or browse</p>
                </div>
              ) : (
                <div className="input_inner">
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
        accept=".mp4, .mkv"
        disabled={isEdit ? false : true}
      />
    </div>
  );
};

export default CompanyVideoInput;
