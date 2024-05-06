import { base_url } from "@/utils/auth/global";
import React from "react";
import VideoPlayer from "../commons/video-player/VideoPlayer";
import StoreCertificates from "../SellerStore/StoreCertificates";

const CompanyInfo = ({ store }) => {
  // console.log(store?.certificates);
  return (
    <div className="info">
      <div className="container grid md:grid-cols-1 gap-8">
        {store?.logo && (
          <div className="flex justify-start items-center max-h-[320px]">
            <img
              className="max-w-[180px] max-h-[180px] object-contain"
              loading="lazy"
              src={`${base_url}/uploads/${store?.logo}`}
              alt="store logo"
            />
          </div>
        )}

        <div className="max-h-[530px] h-fit relative">
          <h3 className="!font-inter">Company Description</h3>
          <div className="max-h-[480px] h-fit mt-1 overflow-y-auto">
            <p className="bg-white whitespace-pre-wrap all_break !font-inter">
              {store?.store_info}
            </p>
          </div>
        </div>

        {/* <div className="h-fit md:h-[320px]">
          <StoreCertificates saveCertificates={store?.certificates} />
        </div> */}

        {store?.store_presentation_video && (
          <div className="w-full h-full max-h-[380px] max-w-[700px] overflow-hidden relative mt-2">
            <VideoPlayer
              url={`${base_url}/uploads/${store?.store_presentation_video}`}
              className="object-contain w-full h-full block relative"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyInfo;
