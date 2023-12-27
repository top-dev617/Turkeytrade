import VideoPlayer from "@/components/commons/video-player/VideoPlayer";
import { base_url } from "@/utils/auth/global";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import videoIcon from "../../../../public/assets/vedio-icon.png";

const ProductVideoInput = ({
  video,
  editProduct,
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
    <div className="input_box cursor-pointer relative">
      <div {...getRootProps()} className="input_inner">
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
        accept=".mp4, .mkv"
        multiple={false}
      />
    </div>
  );
};

export default ProductVideoInput;
