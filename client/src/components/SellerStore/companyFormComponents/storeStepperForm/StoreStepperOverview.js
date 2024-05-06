import VideoPlayer from "@/components/commons/video-player/VideoPlayer";
import useViewImage from "@/lib/hooks/useViewImage";
import useViewVideo from "@/lib/hooks/useViewVideo";
import { iVerticalLine } from "@/utils/icons/icons";
import React from "react";

const StoreStepperOverview = ({ storeName, logo, video, description }) => {
  const { viewImg } = useViewImage();
  const { viewVideo } = useViewVideo();
  return (
    <div className="pt-4 mb-4">
      {logo && (
        <img
          className="max-w-[180px] md:max-w-[240px] max-h-[110px] object-contain"
          loading="lazy"
          src={viewImg(logo)}
          alt="store logo"
        />
      )}

      {description && (
        <div className="max-h-[200px] h-fit relative">
          <h1 className="text-[16px] lg:text-[20px] font-inter font-semibold leading-[24px] text-[#021D00] mb-[10px] mt-3">
            Company Description
          </h1>
          <div className="max-h-[180px] h-fit mt-1 overflow-y-auto">
            <p className="bg-white whitespace-pre-wrap all_break !text-black text-sm md:text-[16px] !font-inter">
              {description}
            </p>
          </div>
        </div>
      )}

      {video && (
        <div className="w-full h-full max-h-[400px] max-w-[600px] overflow-hidden relative mt-4">
          <VideoPlayer
            url={viewVideo(video)}
            playing={false}
            className="object-contain w-full h-full block relative"
          />
        </div>
      )}
    </div>
  );
};

export default StoreStepperOverview;
