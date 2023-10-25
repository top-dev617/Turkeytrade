import React from "react";
import logo from "../../../public/assets/infp-page-logo.png";
import certificate from "../../../public/assets/certificate.png";

const CompanyInfo = ({ store }) => {
  return (
    <div className="info">
      <div className="container grid md:grid-cols-2 gap-8">

        <div className="h-[320px]">
          <h3>Company info</h3>
          <div className="max-h-[270px] overflow-y-auto mt-2">
            <p style={{ fontWeight: "600" }}>
              SteelManufacturer AB: Your Trusted Steel Partner
            </p>{" "}
            <br />
            <p>{store?.store_info}</p>
          </div>
        </div>

        <div className="flex justify-center items-center h-[320px]">
          <img className="max-w-[300px] object-cover" loading="lazy" src={store?.logo} alt="store logo" />
        </div>

        <div className="h-fit md:h-[320px]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">

            {
              store?.certificates.map((ctr, index) => (
                <div className="w-full h-[140px] p-2 flex justify-center items-center border rounded-md">
                  <img key={index} loading="lazy" className="w-full h-full object-contain" src={ctr} alt="" />
                </div>
              ))
            }
          </div>
        </div>

        <div className="h-[320px] max-h-[320px]">
          <video controls loop autoPlay muted className="w-100 h-100 block relative">
            <source src={store?.store_presentation_video} type="video/mp4" className="relative" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
