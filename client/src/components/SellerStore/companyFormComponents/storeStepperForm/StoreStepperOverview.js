import VideoPlayer from "@/components/commons/video-player/VideoPlayer";
import useViewImage from "@/lib/hooks/useViewImage";
import useViewVideo from "@/lib/hooks/useViewVideo";
import { iVerticalLine } from "@/utils/icons/icons";
import React from "react";

const StoreStepperOverview = ({ logo, video, description }) => {
  const { viewImg } = useViewImage();
  const { viewVideo } = useViewVideo();
  return (
    <div>
      <div className="grid lg:grid-cols-2 mb-[20px] gap-x-[25px]">
        <div>
          <h1 className="text-[16px] lg:text-[20px] font-inter font-semibold leading-[24px] text-[#021D00] mb-[10px]">
            Logo
          </h1>
          <img
            src={viewImg(logo)}
            alt=""
            className="max-w-[200px] max-h-[120px] md:h-[80px] lg:h-[120px] object-contain"
          />
          <h1 className="text-[16px] lg:text-[20px] font-inter font-semibold leading-[24px] text-[#021D00] mt-[22px]">
            Video Presentation
          </h1>
          <div className="overflow-hidden">
            <VideoPlayer
              url={viewVideo(video)}
              playing={false}
              className="object-contain w-full md:max-h-[120px] lg:max-h-[220px] block relative mt-[10px]"
            />
          </div>
        </div>
        <div className="flex items-center w-full h-full justify-between gap-x-[25px]">
          <div className="w-fit hidden lg:block">{iVerticalLine}</div>
          <div className="flex-grow">
            <h1 className="text-[16px] lg:text-[20px] font-inter font-semibold leading-[24px] text-[#021D00] mb-[10px]">
              Company Description
            </h1>
            <textarea
              value={description}
              className="lg:max-h-[380px] h-[180px] lg:h-[300px] bg-white resize-none text-[#000000] text-[16px] font-inter p-0 placeholder:font-inter placeholder:text-[#000000]"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreStepperOverview;
