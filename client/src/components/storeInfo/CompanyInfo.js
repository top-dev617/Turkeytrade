import { base_url } from "@/utils/auth/global";
import React from "react";
import VideoPlayer from "../commons/video-player/VideoPlayer";
import StoreCertificates from "../SellerStore/StoreCertificates";

const CompanyInfo = ({ store }) => {
  // console.log(store?.certificates);
  return (
    <div className="info">
      <div className="container grid md:grid-cols-1 gap-8">
        <div className="max-w-[400px]">
          <label className="!font-semibold !font-inter">Logo</label>
          <div className="flex justify-center items-center max-h-[320px]">
            <img
              className="max-w-[180px] max-h-[180px] object-contain"
              loading="lazy"
              src={`${base_url}/uploads/${store?.logo}`}
              alt="store logo"
            />
          </div>
        </div>

        <div className="h-[320px]">
          <h3>Company Description</h3>
          <textarea
            className="max-h-[270px] h-full mt-2 p-0 bg-white resize-none"
            name="store_info"
            value={store?.store_info}
            readOnly
          ></textarea>
        </div>

        {/* <div className="h-fit md:h-[320px]">
          <StoreCertificates saveCertificates={store?.certificates} />
        </div> */}

        <div className="w-full h-full max-h-[320px] max-w-[600px]">
          {store?.store_presentation_video && (
            <VideoPlayer
              url={`${base_url}/uploads/${store?.store_presentation_video}`}
              className="object-contain w-full h-full block relative"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
