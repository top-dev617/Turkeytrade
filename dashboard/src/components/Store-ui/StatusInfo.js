import { iArrowRight } from "@/utils/icons/icons";
import { Breadcrumbs } from "@material-tailwind/react";
import moment from "moment";
import React from "react";

const StatusInfo = ({ status_info }) => {
  return (
    <>
      <Breadcrumbs
        separator={iArrowRight}
        className="rounded bg-blue-gray-600 p-1 mb-4"
      >
        <p className="rounded bg-white px-3 py-1 font-medium text-gray-900 min-w-[150px] text-center">
          Old Status
        </p>
        <p className="rounded bg-white px-3 py-1 font-medium text-gray-900 min-w-[150px] text-center">
          New Status
        </p>
        <p className="rounded bg-white px-3 py-1 font-medium text-gray-900 min-w-[150px] text-center">
          Date
        </p>
      </Breadcrumbs>
      <div className="max-h-[350px] overflow-y-auto scrollbarSM">
        {status_info?.map((info, index) => (
          <Breadcrumbs
            key={index}
            separator={iArrowRight}
            className="rounded-full border border-white bg-blue-gray-400 bg-opacity-20 p-1 mt-2"
          >
            <p
              className={`rounded-full px-3 py-1 font-medium text-gray-900 min-w-[150px] text-center uppercase ${
                (info?.old_status === "accept" && "bg-[#DAFFDA]") ||
                (info?.old_status === "pending" && "bg-[#D9DBDF]") ||
                (info?.old_status === "decline" && "bg-[#FFDCDC]")
              }`}
            >
              {info?.old_status}
            </p>
            <p
              className={`rounded-full px-3 py-1 font-medium text-gray-900 min-w-[150px] text-center uppercase ${
                (info?.status === "accept" && "bg-[#DAFFDA]") ||
                (info?.status === "pending" && "bg-[#D9DBDF]") ||
                (info?.status === "decline" && "bg-[#FFDCDC]")
              }`}
            >
              {info?.status}
            </p>
            <p
              className={`rounded-full px-3 py-1 font-medium text-gray-900 min-w-[150px] text-center uppercase bg-white`}
            >
              {moment(info?.date).format("MMM DD YYYY")}
            </p>
          </Breadcrumbs>
        ))}
      </div>
    </>
  );
};

export default StatusInfo;
