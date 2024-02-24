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
import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const SingleMessage = ({ message, chat }) => {
  const { user } = useContext(AuthContext);
  const { viewVideo } = useViewVideo();
  const { inputTime } = useLocalTime();
  const [open, setOpen] = useState("");

  const scroll = useRef();
  // useEffect(() => {
  //   scroll.current?.scrollIntoView({ behavior: "smooth" });
  // }, [message]);

  return (
    <>
      {message?.members[1] === user?._id ? (
        <div className="flex items-end flex-row-reverse justify-start gap-2 mt-4 mb-4">
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
            <small className="text-gray-700 text-[10px] text-end block">
              {message?.createdAt &&
                inputTime(message?.createdAt, DATE_FORMATE)}
            </small>
            <div className="flex flex-col items-end bg-pm text-white px-[6px] p-[6px] w-fit h-fit rounded-[3px]">
              {message?.images?.length > 0 && (
                <div
                  className={`cursor-pointer grid ${
                    message?.images?.length === 1
                      ? "grid-cols-1"
                      : "grid-cols-2"
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
                <div className="bg-[#E1EEE8] rounded-[3px]">
                  <div className="flex justify-between items-center gap-3 w-full h-[50px] border-pm rounded-[3px] overflow-hidden cursor-pointer">
                    <div className="h-full min-w-[50px] flex justify-center items-center text-sm font-bold text-red-600 bg-pmd uppercase">
                      {message?.document?.split(".").pop().toLowerCase()}
                    </div>
                    <div className="flex flex-col gap-1 flex-grow pr-2 w-full bg-[#E1EEE8]">
                      <h1 className="oneLine text-black font-sm font-semibold">
                        Document file
                      </h1>
                      <small className="text-xs text-gray-500">
                        Document file
                      </small>
                    </div>
                    <div
                      onClick={() => handleDownload(message?.document)}
                      className="h-full min-w-[50px] flex justify-center items-center text-base font-bold text-white cursor-pointer bg-pmd hover:bg-pmd uppercase"
                    >
                      {iDownload}
                    </div>
                  </div>
                </div>
              )}
              {message?.video && (
                <div className="max-h-fit h-fit max-w-[400px] w-full">
                  <VideoPlayer
                    url={viewVideo(message?.video)}
                    className="object-contain w-full h-full"
                    playing={false}
                  />
                </div>
              )}
              {message?.message && (
                <div className="text-white  p-0 mx-0 mt-1 relative w-fit">
                  <div className="label-list text-white break-all !text-xs !font-medium">
                    {message?.message}
                  </div>

                  <div className="absolute -right-3 bottom-[6px] transform -translate-x-1/2 rotate-45 w-2 h-2 bg-pm"></div>
                </div>
              )}
              {/* <small
                ref={scroll}
                className="text-gray-200 text-[10px] mt-1 !mb-[5]"
              >
                {message?.createdAt && inputTime(message?.createdAt)}
              </small> */}
            </div>
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
          <div className="w-fit max-w-[70%] h-fit">
            <small className="text-gray-700 text-[10px]">
              {message?.createdAt &&
                inputTime(message?.createdAt, DATE_FORMATE)}
            </small>
            <div className=" flex flex-col items-start bg-[#d9eee4] text-white px-[6px] p-[6px] w-fit h-fit rounded-[3px]">
              {message?.images?.length > 0 && (
                <div
                  className={`cursor-pointer grid ${
                    message?.images?.length === 1
                      ? "grid-cols-1"
                      : "grid-cols-2"
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
                <div className="bg-[#E1EEE8] rounded-[3px]">
                  <div className="flex justify-between items-center gap-3 w-full h-[50px] border-pm rounded-[3px] overflow-hidden cursor-pointer">
                    <div className="h-full min-w-[50px] flex justify-center items-center text-sm font-bold text-red-600 bg-pmd uppercase">
                      {message?.document?.split(".").pop().toLowerCase()}
                    </div>
                    <div className="flex flex-col gap-1 flex-grow pr-2 w-full bg-[#E1EEE8]">
                      <h1 className="oneLine text-black font-sm font-semibold">
                        Document file
                      </h1>
                      <small className="text-xs text-gray-500">
                        Document file
                      </small>
                    </div>
                    <div
                      onClick={() => handleDownload(message?.document)}
                      className="h-full min-w-[50px] flex justify-center items-center text-base font-bold text-white cursor-pointer bg-pmd hover:bg-pmd uppercase"
                    >
                      {iDownload}
                    </div>
                  </div>
                </div>
              )}
              {message?.video && (
                <div className="max-h-fit max-w-[400px] w-full">
                  <VideoPlayer
                    url={viewVideo(message?.video)}
                    className="object-contain w-full h-full"
                    playing={false}
                  />
                </div>
              )}
              {message?.message && (
                <div className=" p-0 mx-0 mt-1 relative w-fit">
                  <div className="label-list break-all !text-xs !font-medium">
                    {message?.message}
                  </div>
                  <div className="absolute -left-3 bottom-[6px] transform translate-x-1/2 rotate-45 w-2 h-2 bg-[#d9eee4]"></div>
                </div>
              )}
              {/* <small
                ref={scroll}
                className="text-gray-700 text-[10px] mt-1 !mb-[5]"
              >
                {message?.createdAt && inputTime(message?.createdAt)}
              </small> */}
            </div>
          </div>
        </div>
      )}

      <ShowImage url={open} open={!!open} close={setOpen} />
    </>
  );
};

export default SingleMessage;
