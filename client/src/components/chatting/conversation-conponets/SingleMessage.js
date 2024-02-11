import ShowImage from "@/components/commons/ShowImage";
import VideoPlayer from "@/components/commons/video-player/VideoPlayer";
import { AuthContext } from "@/components/context/AuthContext";
import {
  DATE_FORMATE,
  DATE_TIME_FORMATE,
  TIME_FORMATE,
} from "@/lib/constants/globalConstant";
import useLocalTime from "@/lib/hooks/useLocalTime";
import useViewVideo from "@/lib/hooks/useViewVideo";
import { handleDownload } from "@/lib/services/globalService";
import { base_url } from "@/utils/auth/global";
import { iDownload } from "@/utils/icons/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const SingleMessage = ({ message, chat }) => {
  const { user } = useContext(AuthContext);
  const { viewVideo } = useViewVideo();
  const { inputTime } = useLocalTime();
  const [open, setOpen] = useState("");

  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      {message?.members[1] === user?._id ? (
        <div className="flex items-end flex-row-reverse justify-start gap-2 mt-4">
          <div className="flex-none flex flex-col items-center justify-center space-y-1 mb-2">
            <button className="flex items-center justify-center min-w-[32px] uppercase !w-[32px] h-8 rounded-full bg-blue-600 object-cover text-white text-[18px]">
              {user?.logo || user?.image ? (
                <img
                  className="w-full h-full rounded-full bg-white object-cover"
                  src={`${base_url}/uploads/${user?.logo || user?.image}`}
                  alt=""
                />
              ) : (
                <span>
                  {user?.name?.slice(0, 1) || user?.store_name?.slice(0, 1)}
                </span>
              )}
            </button>
          </div>
          <div className="w-fit max-w-[70%] h-fit flex flex-col items-end">
            <small ref={scroll} className="text-gray-900 text-[10px]">
              {message?.createdAt &&
                inputTime(message?.createdAt, DATE_FORMATE)}
            </small>
            {message?.images?.length > 0 && (
              <div
                className={`cursor-pointer grid ${
                  message?.images?.length === 1 ? "grid-cols-1" : "grid-cols-2"
                } gap-2`}
              >
                {message?.images?.map((img, index) => (
                  <img
                    key={index}
                    onClick={() => setOpen(img)}
                    className="w-fit h-fit object-contain max-h-[200px]"
                    src={`${base_url}/uploads/${img}`}
                    alt=""
                  />
                ))}
              </div>
            )}
            {message?.document && (
              <div className="flex justify-between items-center gap-3 w-full h-[50px] border bg-pm/10 rounded-md border-pm overflow-hidden cursor-pointer">
                <div className="h-full w-[50px] flex justify-center items-center text-base font-bold text-red-600 bg-pm uppercase">
                  {message?.document?.split(".").pop().toLowerCase()}
                </div>
                <div className="flex flex-col gap-1 flex-grow pr-2">
                  <h1 className="oneLine text-black font-sm font-semibold">
                    Document file
                  </h1>
                  <small className="text-xs text-gray-500">Document file</small>
                </div>
                <div
                  onClick={() => handleDownload(message?.document)}
                  className="h-full w-[50px] flex justify-center items-center text-base font-bold text-white cursor-pointer bg-pm hover:bg-pmd uppercase"
                >
                  {iDownload}
                </div>
              </div>
            )}
            {message?.video && (
              <div className="max-h-[150px] max-w-[400px] w-full">
                <VideoPlayer
                  url={viewVideo(message?.video)}
                  className="object-contain w-full h-full"
                  playing={false}
                />
              </div>
            )}
            {message?.message && (
              <div className="bg-pm text-white p-2 rounded relative w-fit">
                <div className="label-list text-white">{message?.message}</div>
                <div className="absolute -right-2 bottom-[6px] transform -translate-x-1/2 rotate-45 w-2 h-2 bg-pm"></div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-end gap-2 mb-4">
          <div className="flex-none flex flex-col items-center justify-center space-y-1 mb-2">
            <button className="flex items-center justify-center min-w-[32px] uppercase !w-[32px] h-8 rounded-full bg-blue-600 object-cover text-white text-[18px]">
              {chat?.receiverInfo?.logo || chat?.receiverInfo?.image ? (
                <img
                  className="w-full h-full rounded-full bg-white object-cover"
                  src={`${base_url}/uploads/${
                    chat?.receiverInfo?.logo || chat?.receiverInfo?.image
                  }`}
                  alt=""
                />
              ) : (
                <span>
                  {chat?.receiverInfo?.store_name?.slice(0, 1) ||
                    chat?.receiverInfo?.name?.slice(0, 1)}{" "}
                </span>
              )}
            </button>
          </div>
          <div className="w-fit max-w-[70%] h-fit flex flex-col items-start">
            <small ref={scroll} className="text-gray-900 text-[10px]">
              {message?.createdAt &&
                inputTime(message?.createdAt, DATE_FORMATE)}
            </small>
            {message?.images?.length > 0 && (
              <div
                className={`cursor-pointer grid ${
                  message?.images?.length === 1 ? "grid-cols-1" : "grid-cols-2"
                } gap-2`}
              >
                {message?.images?.map((img, index) => (
                  <img
                    key={index}
                    onClick={() => setOpen(img)}
                    className="w-fit h-fit object-contain max-h-[200px]"
                    src={`${base_url}/uploads/${img}`}
                    alt=""
                  />
                ))}
              </div>
            )}
            {message?.document && (
              <div className="flex justify-between items-center gap-3 w-full h-[50px] border bg-pm/10 rounded-md border-pm overflow-hidden cursor-pointer">
                <div className="h-full w-[50px] flex justify-center items-center text-base font-bold text-red-600 bg-pm uppercase">
                  {message?.document?.split(".").pop().toLowerCase()}
                </div>
                <div className="flex flex-col gap-1 flex-grow pr-2">
                  <h1 className="oneLine text-black font-sm font-semibold">
                    Document file
                  </h1>
                  <small className="text-xs text-gray-500">Document file</small>
                </div>
                <div
                  onClick={() => handleDownload(message?.document)}
                  className="h-full w-[50px] flex justify-center items-center text-base font-bold text-white cursor-pointer bg-pm hover:bg-pmd uppercase"
                >
                  {iDownload}
                </div>
              </div>
            )}
            {message?.video && (
              <div className="max-h-[150px] max-w-[400px] w-full">
                <VideoPlayer
                  url={viewVideo(message?.video)}
                  className="object-contain w-full h-full"
                  playing={false}
                />
              </div>
            )}
            {message?.message && (
              <div className="bg-[#d9eee4] p-2 rounded relative w-fit">
                <div className="label-list">{message?.message}</div>
                <div className="absolute -left-2 bottom-[6px] transform translate-x-1/2 rotate-45 w-2 h-2 bg-[#d9eee4]"></div>
              </div>
            )}
          </div>
        </div>
      )}

      <ShowImage url={open} open={!!open} close={setOpen} />
    </>
  );
};

export default SingleMessage;
