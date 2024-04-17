import VideoPlayer from "@/components/commons/video-player/VideoPlayer";
import { base_url } from "@/utils/auth/global";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import videoIcon from "../../../../public/assets/vedio-icon.png";
import { ACCEPTABLE_VIDEO_FILE } from "@/lib/constants/globalConstant";
import FileExtInfoDialog from "@/components/commons/dialogs/FileExtInfoDialog";

const ProductVideoInput = ({
  video,
  editProduct,
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
      <div className="input_box cursor-pointer relative">
        <div
          {...getRootProps()}
          onClick={() => videoRef.current.click()}
          className="input_inner"
        >
          {video ? (
            <VideoPlayer
              url={viewFile(video)}
              className="object-contain w-100 h-100"
            />
          ) : (
            <>
              {editProduct?._id ? (
                <VideoPlayer
                  url={`${base_url}/uploads/${editProduct?.video}`}
                  className="object-contain w-100 h-100"
                />
              ) : (
                <>
                  <img src={videoIcon.src} alt="" />
                  <p>Drop your video here or browse</p>
                </>
              )}
            </>
          )}
        </div>

        <input
          {...getInputProps()}
          ref={videoRef}
          type="file"
          name="video"
          className="absolute w-full h-full top-0 bottom-0 opacity-0 cursor-pointer"
          accept={ACCEPTABLE_VIDEO_FILE}
          multiple={false}
        />
      </div>

      <FileExtInfoDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default ProductVideoInput;
