import { base_url } from "@/utils/auth/global";
import React, { useEffect, useRef } from "react";

const InboxSingleMessage = ({ message, auth, receiverData }) => {
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      {message?.members[1] === auth?._id ? (
        <div
          ref={scroll}
          className="flex items-end flex-row-reverse justify-start gap-2 mb-4"
        >
          <div className="flex-none flex flex-col items-center justify-center space-y-1">
            <button className="flex items-center justify-center min-w-[40px] !w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]">
              {auth?.logo || auth?.image ? (
                <img
                  className="w-full h-full rounded-full bg-white object-cover"
                  src={`${base_url}/uploads/${auth?.logo || auth?.image}`}
                  alt=""
                />
              ) : (
                <span>
                  {auth?.name?.slice(0, 1) || auth?.store_name?.slice(0, 1)}
                </span>
              )}
            </button>
          </div>
          <div className="w-fit max-w-[70%] h-fit flex flex-col items-end">
            {message?.images?.length > 0 && (
              <>
                <img
                  className="w-fit h-fit object-contain"
                  src={`${base_url}/uploads/${message?.images[0]}`}
                  alt=""
                />
              </>
            )}
            {message?.text && (
              <div className="bg-pm text-white p-2 rounded-lg relative w-fit">
                <div className="label-list text-white">{message?.text}</div>
                <div className="absolute -right-2 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-pm"></div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div ref={scroll} className="flex items-end gap-2 mb-4">
          <div className="flex-none flex flex-col items-center justify-center space-y-1">
            <button className="flex items-center justify-center min-w-[40px] !w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]">
              {receiverData?.logo || receiverData?.image ? (
                <img
                  className="w-full h-full rounded-full bg-white object-cover"
                  src={`${base_url}/uploads/${
                    receiverData?.logo || receiverData?.image
                  }`}
                  alt=""
                />
              ) : (
                <span>
                  {receiverData?.store_name?.slice(0, 1) ||
                    receiverData?.name?.slice(0, 1)}{" "}
                </span>
              )}
            </button>
          </div>

          <div className="w-fit max-w-[70%] h-fit flex flex-col items-start">
            {message?.images?.length > 0 && (
              <img
                className="w-fit h-fit object-contain"
                src={`${base_url}/uploads/${message?.images[0]}`}
                alt=""
              />
            )}
            {message?.text && (
              <div className="bg-[#d9eee4] p-2 rounded-lg relative w-fit">
                <div className="label-list">{message?.text}</div>
                <div className="absolute -left-2 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-[#d9eee4]"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default InboxSingleMessage;
